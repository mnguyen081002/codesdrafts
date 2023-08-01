import { PrimaryButton } from '../Button';

function AdminBar({ open }: { open: () => void }) {
  return (
    <div className="flex h-[65px] w-full items-center justify-between rounded-[5px] px-3 shadow-md">
      <div className="flex h-[45px] w-[508px] items-center rounded-[5px] border border-light-border">
        <input type="text" className="h-full rounded-[5px] border-none bg-white" />
        <span className="flex h-full w-[45px] items-center justify-center">
          <img src="/images/icons/search.svg" alt="" />
        </span>
      </div>
      <PrimaryButton
        text="Thêm"
        className="h-[40px] px-[20px] text-white "
        textClassName="text-[16px] font-lexend-deca font-semibold"
        onClick={open}
      />
    </div>
  );
}

export default AdminBar;
