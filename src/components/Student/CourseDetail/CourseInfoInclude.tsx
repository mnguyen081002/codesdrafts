function CourseInfoInclude({ icon, title, text }: { icon: string; title: string; text?: string }) {
  const socials = ['fb', 'twitter', 'tiktok', 'linkedin'];
  return (
    <div className="flex w-full items-start justify-between">
      <div className="flex items-center gap-[5px]">
        <img className="h-[17.5px] w-[17.5px]" src={icon} alt="hours" />
        <span className="font-lexend-deca text-base font-light leading-5 text-light-text-primary">
          {title}
        </span>
      </div>
      {text ? (
        <span className="max-w-[125px] text-right font-lexend-deca text-base font-light leading-5 text-light-text-primary">
          {text}
        </span>
      ) : (
        <div className="flex gap-[14px]">
          {socials.map((e) => {
            return <img key={e} src={`/images/course/small-${e}.svg`} alt="hours" />;
          })}
        </div>
      )}
    </div>
  );
}

export default CourseInfoInclude;
