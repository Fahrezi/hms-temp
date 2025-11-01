type Props = {
  initial: string;
  className?: string;
}

const Avatar = (props: Props) => {
  const { initial, className } = props;
  return (
    <div
      className={`w-10 h-10 rounded-full bg-hotel-soft-fern/50 text-hotel-green flex items-center justify-center text-md font-bold uppercase ${className}`}
      id="avatar">
      <span id="initial">{initial}</span>
    </div>
  );
}

export default Avatar;