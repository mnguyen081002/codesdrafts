import { Button, Group, Input, Modal, SegmentedControl, Select } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FieldArray, Form, Formik } from 'formik';
import { useEffect, useState } from 'react';
import type { UseFormGetValues } from 'react-hook-form';

import type { CreateOrUpdateSeriesRequest, MySeriesResponse } from '../../api/codedrafts-api';
import { type GetPostsCanAddToSeriesResponse, StudentApi } from '../../api/codedrafts-api';
import EditIcon from '../../common/Icons/EditIcon';
import { RFHInputThumbnail } from '../../common/Input';
import { RHFMutiSelect } from '../../components/hook-form';
import { RHFSelectV2 } from '../../components/hook-form/RHFSelect';
import type { PostEditorFormValuesProps } from '../../pages/blog/editor';
import { toastPromise } from '../../utils/app';

interface SeriesEditModalProps {
  opened: boolean;
  close: () => void;
  seriesId?: number;
  getValues?: UseFormGetValues<PostEditorFormValuesProps>;
  setSeriesOptions: React.Dispatch<React.SetStateAction<MySeriesResponse[]>>;
}

const SeriesEditModal = (props: SeriesEditModalProps) => {
  const [postOptions, setPostOptions] = useState<GetPostsCanAddToSeriesResponse>();
  const [seriesName, setSeriesName] = useState<string>('');
  useEffect(() => {
    if (props.getValues) {
      setSeriesName(props.getValues().series);
    }
    const getPostsCanAddToSeries = async () => {
      const res = await StudentApi.getPostsCanAddToSeries({ series_id: props.seriesId || 0 });
      setPostOptions(res.data.data);
    };
    getPostsCanAddToSeries();
  }, [props.seriesId]);

  const onSubmit = async (values: { values: string[] }) => {
    const req: CreateOrUpdateSeriesRequest = {
      name: seriesName,
      post_ids: values.values.map((item) => {
        return postOptions!.post_can_add_to_series.find((post) => post.title === item)!.id;
      }),
      id: props.seriesId || undefined,
    };

    await toastPromise(StudentApi.createOrUpdateSeries(req), {
      pending: 'Đang cập nhật series',
      success: 'Cập nhật series thành công',
      error: 'Cập nhật series thất bại',
    });

    const res = await StudentApi.getMySeries();
    props.setSeriesOptions(res.data.data);
  };

  const [postTitles, setPostTitles] = useState<string[]>([]);
  return (
    <Modal size={600} title="Series" opened={props.opened} onClose={props.close} centered>
      <Formik
        initialValues={{
          values: postOptions?.post_in_series.map((item) => item.title) || [''],
        }}
        onSubmit={onSubmit}
        enableReinitialize={true}
        values={postOptions?.post_in_series.map((item) => item.title)}
      >
        {({ values }) => (
          <Form className="flex flex-col gap-[20px]">
            <div className=" max-h-[900px] min-h-[400px]">
              <p className="mb-1 text-base">Tên series</p>
              <Input
                type="text"
                placeholder="Nhập tên series"
                value={seriesName}
                onChange={(event) => {
                  setSeriesName(event.currentTarget.value);
                }}
              />
              <FieldArray validateOnChange={false} name="values">
                {(arrayHelpers) => (
                  <div className="mt-2 flex flex-col gap-3">
                    {values.values.length > 0 && (
                      <div>
                        <label className=" text-base">Các bài viết trong series</label>
                        {values.values.map((v, index) => (
                          <div className="flex w-full items-end gap-2" key={index}>
                            <div className="flex h-[36px] w-[30px] items-center">
                              <p className="text-xl">{index + 1}.</p>
                            </div>
                            <div className="w-full">
                              <Select
                                data={
                                  postOptions?.post_can_add_to_series.map((item) => item.title) ||
                                  []
                                }
                                placeholder="Chọn bài viết"
                                name={`values.${index}`}
                                type="text"
                                value={v}
                                searchable
                                onChange={(value) => {
                                  arrayHelpers.replace(index, value);
                                  if (postTitles[index] === undefined) {
                                    console.log('!!!!!!');

                                    setPostTitles([...postTitles, value!]);
                                  } else {
                                    console.log('bbbbbb', postTitles);
                                    const newPostTitles = [...postTitles];
                                    newPostTitles[index] = value!;
                                    console.log('aaaaaaa', newPostTitles);
                                    setPostTitles(newPostTitles);
                                  }
                                }}
                              />
                            </div>
                            <div className="flex h-[46px] items-center justify-center">
                              <Button
                                onClick={() => {
                                  arrayHelpers.remove(index);
                                }}
                                variant="outline"
                                className="border-red-400 px-3 text-xs text-red-400"
                              >
                                Xóa
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                    <Button
                      className="px-3 text-xs"
                      variant="outline"
                      type="button"
                      onClick={() => arrayHelpers.push('')}
                    >
                      Thêm
                    </Button>
                  </div>
                )}
              </FieldArray>
            </div>

            <Group position="center" mt="xl">
              <Button className="bg-light-primary" variant="filled" type="submit">
                Lưu
              </Button>
              <Button
                className="bg-red-500 text-white  transition-colors duration-300 hover:bg-red-600"
                variant="filled"
                onClick={async () => {
                  props.close();
                  await toastPromise(StudentApi.deleteSeries(props.seriesId || 0), {
                    pending: 'Đang xóa series',
                    success: 'Xóa series thành công',
                    error: 'Xóa series thất bại',
                  });
                  StudentApi.getMySeries().then((res) => {
                    props.setSeriesOptions(res.data.data);
                  });
                }}
              >
                Xóa
              </Button>
            </Group>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

interface BlogEditorLeftMenuProps {
  thumbnailUpload: any;
  setThumbnailUpload: any;
  thumbnailPosition: number;
  setThumnailPosition: any;
  titleColor: string;
  setTitleColor: any;
  tagOptions: any;
  tags: any;
  setTags: any;
  metaTitles: any;
  setMetaTitles: any;
  seriesOptions: any;
  postId: any;
  setPostId: any;
  getValues: UseFormGetValues<PostEditorFormValuesProps>;
  setSeriesOptions: React.Dispatch<React.SetStateAction<MySeriesResponse[]>>;
}

function BlogEditorLeftMenu(props: BlogEditorLeftMenuProps) {
  const [openedEdit, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [openedCreate, { open: openCreate, close: closeCreate }] = useDisclosure(false);

  return (
    <div className="flex h-fit w-[340px] flex-col items-center gap-[10px] rounded-md border border-light-border p-[20px]">
      <div className="w-full">
        <p className="text-lg">Ảnh bìa *</p>
      </div>
      <RFHInputThumbnail
        name="file"
        thumbnailUpload={props.thumbnailUpload}
        setThumbnailUpload={props.setThumbnailUpload}
      />
      <div className="w-full">
        <p className="text-lg">Vị trí ảnh bìa *</p>
      </div>
      <div className="flex w-full items-center justify-center gap-[30px]">
        {Array.from({
          length: 2,
        }).map((_, index) => {
          return (
            <div
              className={`cursor-pointer rounded-md border ${
                props.thumbnailPosition === index + 1
                  ? 'border-light-primary'
                  : 'border-light-border'
              }`}
              key={index}
              onClick={() => props.setThumnailPosition(index + 1)}
            >
              <img src={`/svg/thumnail-position-${index + 1}.svg`} alt="" />
            </div>
          );
        })}
      </div>

      {props.thumbnailPosition === 2 && (
        <>
          <div className="w-full">
            <p className="text-lg">Màu tiêu đề *</p>
          </div>
          <SegmentedControl
            value={props.titleColor}
            onChange={props.setTitleColor}
            data={[
              {
                label: 'Trắng',
                value: '#ffffff',
              },
              {
                label: 'Đen',
                value: '#000000',
              },
            ]}
          />
        </>
      )}

      <RHFMutiSelect
        className="w-[300px]"
        name="tags"
        options={props.tagOptions.map((item) => item.title)}
        value={props.tags}
        setValue={props.setTags}
        label={'Tags *'}
        placeholder="Chọn tags"
        type="text"
        isMulti
      />
      <RHFMutiSelect
        className="w-[300px]"
        options={props.metaTitles}
        value={props.metaTitles}
        setValue={props.setMetaTitles}
        name="metaTitles"
        label={'Meta title *'}
        maxLength={200}
        creatable
        placeholder="Nhập meta title"
        type="text"
        isMulti
      />
      <div className="flex h-[76px] w-fit items-end gap-[12px]">
        <RHFSelectV2
          name="series"
          options={props.seriesOptions.map((item) => item.name)}
          label={'Series'}
          placeholder="Chọn series"
          type="text"
          searchable
        />
        <div className="flex h-[46px] items-center">
          <EditIcon className="h-[20px] w-[20px] cursor-pointer" onClick={openEdit} />
        </div>
        <SeriesEditModal
          setSeriesOptions={props.setSeriesOptions}
          getValues={props.getValues}
          seriesId={props.seriesOptions.find((item) => item.name === props.getValues().series)?.id}
          close={closeEdit}
          opened={openedEdit}
        />
      </div>
      <p
        className="cursor-pointer text-base text-light-primary hover:text-light-dark"
        onClick={openCreate}
      >
        Tạo series mới
      </p>
      <SeriesEditModal
        setSeriesOptions={props.setSeriesOptions}
        close={closeCreate}
        opened={openedCreate}
      />
    </div>
  );
}

export default BlogEditorLeftMenu;
