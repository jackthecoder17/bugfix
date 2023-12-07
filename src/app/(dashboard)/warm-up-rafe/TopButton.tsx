"use client";
import DeleteIcon from "@/app/assets/icons/svg/delete.svg";
import PauseIcon from "@/app/assets/icons/svg/pause.svg";
import ResumeIcon from "@/app/assets/icons/svg/resume.svg";

type Status = "delete" | "pause" | "resume";
interface TopButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  status: Status;
  disabled?: boolean;
}

export function TopButton({
  className,
  status,
  disabled,
  ...props
}: TopButtonProps) {
  function HandleStatus() {
    const returnObject = {
      color: {
        bg: "bg-[#28B446]",
        fg: "text-white",
      },
      component: ResumeIcon,
    };

    if (status === "delete") {
      returnObject.color.bg = "bg-[#dd2222]";
      returnObject.component = DeleteIcon;
      return returnObject;
    }
    if (status === "pause") {
      returnObject.color.bg = "bg-[#FFFF00]";
      returnObject.color.fg = "text-black";
      returnObject.component = PauseIcon;
      return returnObject;
    }
    return returnObject;
  }
  const color = HandleStatus().color;
  const Icon = HandleStatus().component;
  let tw = `flex items-center w-fit  px-3 py-2 text-base disabled:opacity-20 rounded-md ${color.bg} ${color.fg}`;

  return (
    <button disabled={disabled} className={`${className} ${tw}`} {...props}>
      <Icon />
    </button>
  );
}
