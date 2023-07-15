import { useState } from 'react';

import type { ExecuteResponse } from '../../api/codesmooth-api';
import CloseIcon from '../../common/Icons/CloseIcon';
import DoneIcon from '../../common/Icons/DoneIcon';
import { CircleLoading } from '../../common/Loading';
import { UnderlineNavbarWithOutSlug } from '../NavBar/UnderlineNavbar';

interface IResultTableProps {
  results?: ExecuteResponse;
  isWaitingExecute: boolean;
}

function ResultTable(props: IResultTableProps) {
  const [selectingTitle, setSelectingTitle] = useState<string>('Kết quả');
  return props.results ? (
    <div className="relative flex flex-col items-center gap-[20px] border-t border-light-border py-[25px] px-[15px]">
      {props.isWaitingExecute ? (
        <div className="flex h-16 items-center justify-center gap-2">
          <CircleLoading />
          <span className="font-semibold">Waiting for result...</span>
        </div> // <ExecuteResult executeRes={executeRes!}></ExecuteResult>vnghygffgbhjuygfvbnmjuytgfcv bnhgvghbffvvvc c
      ) : (
        <>
          <CloseIcon height="24" width="24" className="absolute right-4 top-4" />
          <UnderlineNavbarWithOutSlug
            onChange={(value) => {
              setSelectingTitle(value);
            }}
            value={selectingTitle}
            navs={[
              {
                title: 'Kết quả',
              },
              {
                title: 'Console',
              },
            ]}
          />
          {selectingTitle === 'Console' && (
            <div className="flex w-full bg-[#F8F8F8] py-[10px] px-[20px]">
              <p>3</p>
            </div>
          )}
          {selectingTitle === 'Kết quả' && (
            <>
              <p className=" text-lg font-semibold text-light-primary">0 trên 1 test hoàn thành</p>
              <div>
                <table className="w-full border border-light-border">
                  <thead className="bg-[#F8F8F8]">
                    <tr>
                      <th className="h-[42px] w-[120px] border-r border-light-border">
                        <p className="font-instructorSidebar text-sm font-semibold text-[#3A3A3A]">
                          Kết quả
                        </p>
                      </th>
                      <th className="h-[42px] border-r border-light-border">
                        <p className="font-instructorSidebar text-sm font-semibold text-[#3A3A3A]">
                          Đầu vào
                        </p>
                      </th>
                      <th className="h-[42px] border-r border-light-border">
                        <p className="font-instructorSidebar text-sm font-semibold text-[#3A3A3A]">
                          Đầu ra mong đợi
                        </p>
                      </th>
                      <th className="h-[42px] border-light-border">
                        <p className="font-instructorSidebar text-sm font-semibold text-[#3A3A3A]">
                          Đầu ra thực tế
                        </p>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="max-h-[700px] overflow-y-scroll">
                    {props.results.results.map((e, index) => (
                      <tr key={index}>
                        <td className=" w-[121px] border-r border-t border-light-border">
                          <div className="flex min-h-[42px] items-center justify-center">
                            {e.succeeded ? (
                              <DoneIcon pathFill="#27AE60" />
                            ) : (
                              <CloseIcon pathFill="#EB3223" />
                            )}
                          </div>
                        </td>
                        <td className="w-[237px] border-r border-t border-light-border">
                          <div className="flex min-h-[42px] items-center justify-center">
                            <p className="break-words">{e.input}</p>
                          </div>
                        </td>
                        <td className="w-[300px] border-r border-t border-light-border">
                          <div className="flex min-h-[42px] flex-1  items-center justify-center">
                            <p className="break-words">{e.expected_output}</p>
                          </div>
                        </td>
                        <td className="w-[300px] border-r border-t border-light-border">
                          <div className="flex min-h-[42px] flex-1  items-center justify-center">
                            <p className="break-words">{e.actual_output}</p>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}
    </div>
  ) : (
    <></>
  );
}

export { ResultTable };
