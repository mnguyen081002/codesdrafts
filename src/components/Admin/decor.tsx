function DecorAdmin({ text }: { text?: string }) {
  return (
    <div className="relative flex h-[90px] items-center rounded-lg bg-[#EBF3FE] px-[30px]">
      <p className="text-[28px] font-medium leading-normal">{text}</p>
      <img
        className="absolute bottom-0 right-8 h-[60px] w-[128px] object-contain"
        alt=""
        src="/bo-purple.png"
      />
    </div>
  );
}

export default DecorAdmin;
