import { NextPage } from "next/types";
import Modal from "@/components/modal/modal";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import TextField from "@/components/formik/text-field";
import DatetimeField from "@/components/formik/datetime-field";
import ButtonSubmit from "@/components/formik/button-submit";
import notif from "@/utils/notif";
import { MdClose } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import DropdownField from "../formik/dropdown-field";
import moment from "moment";


type Props = {
  show: boolean;
  onClickOverlay: Function;
  data: any;
  items: any[];
  groups: any[];
  setItems: Dispatch<SetStateAction<any[]>>
}

const schema = Yup.object().shape({
  name: Yup.string().required('Required field'),
});

const ModalAddEvent: NextPage<Props> = ({ show, onClickOverlay, data, items, groups, setItems }) => {

  const handleSubmit = (values: FormikValues, formikHelpers: FormikHelpers<any>) => {
    setItems([...items, {
      id: items.length.toString(),
      groupId: values.groupId,
      name: values.name,
      description: values.description,
      start: moment(values.start_time),
      end: moment(values.end_time),
      status: 1,
      itemProps: {
        className: 'text-xs text-primary-500 bg-primary-200 text-ellipsis overflow-hidden border border-primary-500',
      }
    }])
    onClickOverlay()
  }

  return (
    <>
      <Modal show={show} onClickOverlay={onClickOverlay} layout={'sm:max-w-lg'}>
        <div className="p-4">
          <div className={'text-xl mb-4 flex justify-between items-center'}>
            <div>{'Add Event'}</div>
            <button type={'button'} className={'text-rose-500 disabled:bg-gray-400 font-bold rounded-full size-8 flex justify-center items-center'} onClick={() => onClickOverlay()}>
              <MdClose className='' size={'1.5rem'} />
            </button>
          </div>
          <div>
            <Formik
              initialValues={data}
              validationSchema={schema}
              enableReinitialize={true}
              onSubmit={(values, formikHelpers) => handleSubmit(values, formikHelpers)}
            >
              {({ values, errors, touched, setValues, setFieldValue }) => {
                return (
                  <Form encType='multipart/form-data'>
                    <div>{JSON.stringify(values)}</div>
                    <div className='mb-4'>
                      <TextField
                        label={'Name'}
                        name={'name'}
                        type={'text'}
                        placeholder={'Name'}
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <DropdownField
                        label={'Property'}
                        name={'groupId'}
                        items={groups}
                        keyValue={'id'}
                        keyLabel={'name'}
                        placeholder={'Property'}
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <DatetimeField
                        label={'Start'}
                        name={'start_time'}
                        required
                      />
                    </div>
                    <div className='mb-4'>
                      <DatetimeField
                        label={'End'}
                        name={'end_time'}
                        required
                      />
                    </div>
                    <div className=''>
                      <ButtonSubmit
                        label={'Save'}
                      />
                    </div>
                  </Form>
                )
              }}
            </Formik>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default ModalAddEvent