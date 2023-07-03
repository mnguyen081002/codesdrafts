function DecorAdmin({ text }: { text?: string }) {
  return (
    <div className="flex h-[90px] items-start justify-between rounded-lg bg-[#EBF3FE] p-[30px]">
      <p className="text-xl font-medium">{text}</p>
      <img className="h-[60px] w-[128px] object-contain" alt="" src="/bo-purple.png" />
    </div>
  );
}

export default DecorAdmin;
