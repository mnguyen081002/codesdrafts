function CourseSubInfo({ icon, text }: { icon: string; text: string }) {
  return (
    <div className="flex items-center gap-[10px]">
      <img src={icon} alt="lessons" />
      <span className="text-lg leading-5 text-white opacity-70">{text}</span>
    </div>
  );
}

export default CourseSubInfo;
