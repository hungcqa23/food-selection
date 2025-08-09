const STORAGE_KEY = 'randomFoodList';

let foodList = [];
let currentEditIndex = -1;
let isSpinning = false;

function loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        foodList = JSON.parse(stored);
    } else {
        foodList = [
            'Phở', 'Bún bò', 'Cơm tấm', 'Bánh mì', 'Bún chả',
            'Mì Quảng', 'Hủ tiếu', 'Cơm gà', 'Pizza', 'Burger'
        ];
        saveToStorage();
    }
}

function saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(foodList));
}

function renderFoodList() {
    const foodListEl = document.getElementById('foodList');
    const emptyStateEl = document.getElementById('emptyState');
    const spinButton = document.getElementById('spinButton');
    const clearAllBtn = document.getElementById('clearAllBtn');

    if (foodList.length === 0) {
        foodListEl.style.display = 'none';
        emptyStateEl.style.display = 'block';
        spinButton.disabled = true;
        clearAllBtn.disabled = true;
    } else {
        foodListEl.style.display = 'flex';
        emptyStateEl.style.display = 'none';
        spinButton.disabled = false;
        clearAllBtn.disabled = false;

        foodListEl.innerHTML = foodList.map((food, index) => `
            <div class="food-item">
                <span class="food-name">${food}</span>
                <div class="food-actions">
                    <button class="btn-icon btn-edit" onclick="openEditModal(${index})">✏️</button>
                    <button class="btn-icon btn-delete" onclick="deleteFood(${index})">🗑️</button>
                </div>
            </div>
        `).join('');
    }
}

function addFood(event) {
    event.preventDefault();
    const input = document.getElementById('foodInput');
    const foodName = input.value.trim();

    if (foodName && !foodList.includes(foodName)) {
        foodList.push(foodName);
        saveToStorage();
        renderFoodList();
        input.value = '';
        showNotification('✅ Đã thêm món ăn mới!');
    } else if (foodList.includes(foodName)) {
        showNotification('⚠️ Món ăn này đã có trong danh sách!');
    }
}

function deleteFood(index) {
    const foodName = foodList[index];
    if (confirm(`Bạn có chắc muốn xóa "${foodName}" không?`)) {
        foodList.splice(index, 1);
        saveToStorage();
        renderFoodList();
        showNotification('🗑️ Đã xóa món ăn!');
    }
}

function clearAllFoods() {
    if (foodList.length === 0) return;
    
    const confirmMessage = `Bạn có chắc muốn xóa tất cả ${foodList.length} món ăn không?\n\nHành động này không thể hoàn tác!`;
    
    if (confirm(confirmMessage)) {
        foodList = [];
        saveToStorage();
        renderFoodList();
        
        const resultText = document.getElementById('resultText');
        resultText.textContent = '???';
        
        showNotification('🧹 Đã xóa toàn bộ danh sách món ăn!');
    }
}

function openEditModal(index) {
    currentEditIndex = index;
    const modal = document.getElementById('editModal');
    const editInput = document.getElementById('editInput');
    
    editInput.value = foodList[index];
    modal.classList.add('active');
    editInput.focus();
}

function closeEditModal() {
    const modal = document.getElementById('editModal');
    modal.classList.remove('active');
    currentEditIndex = -1;
}

function saveEdit(event) {
    event.preventDefault();
    const editInput = document.getElementById('editInput');
    const newName = editInput.value.trim();

    if (newName && currentEditIndex >= 0) {
        if (!foodList.includes(newName) || foodList[currentEditIndex] === newName) {
            foodList[currentEditIndex] = newName;
            saveToStorage();
            renderFoodList();
            closeEditModal();
            showNotification('✅ Đã cập nhật món ăn!');
        } else {
            showNotification('⚠️ Tên món ăn này đã tồn tại!');
        }
    }
}

function spinFood() {
    if (isSpinning || foodList.length === 0) return;

    isSpinning = true;
    const spinButton = document.getElementById('spinButton');
    const resultText = document.getElementById('resultText');
    
    spinButton.disabled = true;
    resultText.classList.add('spinning');

    let spinCount = 0;
    const totalSpins = 20;
    const spinInterval = setInterval(() => {
        const randomIndex = Math.floor(Math.random() * foodList.length);
        resultText.textContent = foodList[randomIndex];
        spinCount++;

        if (spinCount >= totalSpins) {
            clearInterval(spinInterval);
            
            const finalIndex = Math.floor(Math.random() * foodList.length);
            const finalFood = foodList[finalIndex];
            
            setTimeout(() => {
                resultText.textContent = finalFood;
                resultText.classList.remove('spinning');
                spinButton.disabled = false;
                isSpinning = false;
                
                confetti();
                showNotification(`🎉 Hôm nay ăn ${finalFood}!`);
            }, 300);
        }
    }, 100);
}

function confetti() {
    const resultDisplay = document.getElementById('resultDisplay');
    const rect = resultDisplay.getBoundingClientRect();
    
    for (let i = 0; i < 30; i++) {
        const confettiEl = document.createElement('div');
        confettiEl.style.position = 'fixed';
        confettiEl.style.left = rect.left + rect.width / 2 + 'px';
        confettiEl.style.top = rect.top + rect.height / 2 + 'px';
        confettiEl.style.width = '10px';
        confettiEl.style.height = '10px';
        confettiEl.style.background = ['#FF6B6B', '#4ECDC4', '#FFE66D', '#45B7AA', '#FF5252'][Math.floor(Math.random() * 5)];
        confettiEl.style.borderRadius = '50%';
        confettiEl.style.pointerEvents = 'none';
        confettiEl.style.zIndex = '9999';
        
        document.body.appendChild(confettiEl);
        
        const angle = (Math.PI * 2 * i) / 30;
        const velocity = 5 + Math.random() * 5;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity - 10;
        
        let x = 0;
        let y = 0;
        let opacity = 1;
        
        const animateConfetti = () => {
            x += vx;
            y += vy + 0.5;
            opacity -= 0.02;
            
            confettiEl.style.transform = `translate(${x}px, ${y}px)`;
            confettiEl.style.opacity = opacity;
            
            if (opacity > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                confettiEl.remove();
            }
        };
        
        requestAnimationFrame(animateConfetti);
    }
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.background = 'white';
    notification.style.padding = '15px 25px';
    notification.style.borderRadius = '10px';
    notification.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    notification.style.fontSize = '16px';
    notification.style.fontWeight = '500';
    notification.style.zIndex = '10000';
    notification.style.animation = 'slideIn 0.3s ease';
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateX(0); }
        to { opacity: 0; transform: translateX(20px); }
    }
`;
document.head.appendChild(style);

window.addEventListener('click', (e) => {
    if (e.target.id === 'editModal') {
        closeEditModal();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    loadFromStorage();
    renderFoodList();
    
    document.getElementById('addFoodForm').addEventListener('submit', addFood);
    document.getElementById('editForm').addEventListener('submit', saveEdit);
    document.getElementById('spinButton').addEventListener('click', spinFood);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.getElementById('editModal').classList.contains('active')) {
            closeEditModal();
        }
        
        if (e.key === ' ' && !isSpinning && foodList.length > 0 && 
            document.activeElement.tagName !== 'INPUT') {
            e.preventDefault();
            spinFood();
        }
    });
});
