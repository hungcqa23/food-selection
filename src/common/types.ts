export type FunctionComponent = React.ReactElement | null;

type LucideIconProps = React.SVGProps<SVGSVGElement> & {
  size?: string | number;
};
export type LucideIcon = React.FC<LucideIconProps>;
