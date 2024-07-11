import { NextPage } from "next/types";
import Modal from "@/components/modal/modal";
import { useEffect, useState } from "react";
import * as Yup from 'yup';
import { Form, Formik, FormikHelpers, FormikValues } from "formik";
import TextField from "@/components/formik/text-field";
import ButtonSubmit from "@/components/formik/button-submit";
import notif from "@/utils/notif";
import { MdClose } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";


type Props = {
  show: boolean;
  onClickOverlay: Function;
  data: any
}

const schema = Yup.object().shape({
  name: Yup.string().required('Required field'),
});

const ModalAddEvent: NextPage<Props> = ({ show, onClickOverlay, data }) => {
  console.log('ModalAddEvent ', data)

  const handleSubmit = (values: FormikValues, formikHelpers: FormikHelpers<any>) => {
    
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
                        label={'Player name'}
                        name={'name'}
                        type={'text'}
                        placeholder={'Player name'}
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