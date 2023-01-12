import React, { useEffect } from 'react';
import styled from 'styled-components';
import Button from 'components/Button';
import { useFormik } from 'formik';
import * as yup from 'yup';
import moment from 'moment';
import InputText from 'components/InputText';
import SelectInput from 'components/SelectInput';
import RichText from 'components/RichText';
import PanelCard from 'components/PanelCard';
import InputDate from 'components/InputDate';
import { JobTypes, JobProps } from 'types';
import { JobService } from 'hooks/useJobService';
import { Spin } from 'antd';
import { ErrorContext } from 'components/ErrorContext';
import { ErrorContextType } from 'types';

interface PostJobProps {
  uid: string;
  lat: number;
  lng: number;
  address: string;
  isLoading: boolean;
  categoriesData: Record<string, string>[] | undefined;
}

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = yup.object({
  title: yup.string().required().min(5, 'Min 5 characters'),
  category: yup.number().required(),
  employmentType: yup.string().required(),
  description: yup.string().required(),
  salary: yup.number().min(300).required(),
  link: yup
    .string()
    .matches(
      // eslint-disable-next-line
      /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
      'Enter correct url!'
    )
    .required('Please enter website'),
  email: yup.string().email().required(),
  address: yup.string().required(),
  phone: yup
    .string()
    .matches(phoneRegExp, 'Phone number is not valid')
    .min(10, 'too short')
    .max(15, 'too long'),
  lat: yup.number().required(),
  lng: yup.number().required(),
  expirationDate: yup
    .date()
    .min(moment())
    .max(moment().add(1, 'months').calendar())
    .required(),
});

const PostJobContent = ({
  uid,
  isLoading,
  lat,
  lng,
  address,
  categoriesData,
}: PostJobProps) => {
  const { CreateJob } = JobService();
  const { setErrorText } = React.useContext(ErrorContext) as ErrorContextType;

  const {
    mutate,
    isLoading: createJobIsLoading,
    isError,
    isSuccess: isSuccessJob,
  } = CreateJob();

  useEffect(() => {
    if (isError) {
      setErrorText('Error: unable to save or only one Job Post per user');
    }
  }, [isError, setErrorText]);

  useEffect(() => {
    if (isSuccessJob) {
      setErrorText('Job details was saved');
    }
  }, [isSuccessJob, setErrorText]);

  const formik = useFormik({
    initialValues: {
      uid: uid,
      title: '',
      category: '',
      employmentType: '',
      salary: 300,
      link: '',
      email: '',
      address: address,
      phone: '',
      lat: lat,
      lng: lng,
      description: '',
      expirationDate: new Date(moment().add(1, 'months').calendar()),
    },
    validationSchema: validationSchema,

    onSubmit: (data: JobProps) => {
      if (data) {
        mutate(data);
      }
    },
  });

  return (
    <PanelCard width={100}>
      {createJobIsLoading && <Spin />}
      <FormContainer onSubmit={formik.handleSubmit}>
        <AddressContainer>Current Location: {address}</AddressContainer>
        <InputContainer>
          <InputText
            placeholder="Job Title"
            name="title"
            onChange={formik.handleChange}
            // onBlur={formik.handleBlur}
            value={formik.values.title}
            errorMessage={formik.errors.title}
          />
        </InputContainer>
        <InputContainer>
          <SelectInput
            placeholder="Category"
            name="category"
            options={categoriesData || []}
            onChange={formik.handleChange}
            value={formik.values.category}
            errorMessage={formik.errors.category && 'Please choose a category'}
            isLoading={isLoading}
          />
        </InputContainer>
        <InputContainer>
          <SelectInput
            placeholder="Employment Type"
            options={[
              {
                [JobTypes.FULLTIME?.replace(' ', '')]: JobTypes.FULLTIME,
              },
              {
                [JobTypes.PARTTIME?.replace(' ', '')]: JobTypes.PARTTIME,
              },
            ]}
            name="employmentType"
            onChange={formik.handleChange}
            value={formik.values.employmentType}
            errorMessage={
              formik.errors.employmentType && 'Please choose a Type'
            }
          />
        </InputContainer>
        <InputContainer>
          <InputText
            placeholder="Salary per day (min 300 pesos)"
            name="salary"
            onChange={formik.handleChange}
            value={formik.values.salary}
            errorMessage={formik.errors.salary && 'Salary minimum 300 pesos'}
          />
        </InputContainer>
        <InputContainer>
          <InputText
            placeholder="Link"
            name="link"
            onChange={formik.handleChange}
            value={formik.values.link}
            errorMessage={formik.errors.link}
          />
        </InputContainer>
        <InputContainer>
          <InputText
            placeholder="Email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            errorMessage={formik.errors.email}
          />
        </InputContainer>
        <InputContainer>
          <InputDate
            placeholder="ExpirationDate"
            name="expirationDate"
            onChange={formik.handleChange}
            value={formik.values.expirationDate}
            errorMessage={formik.errors.expirationDate}
          />
        </InputContainer>
        <InputContainer>
          <InputText
            placeholder="Phone Number"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            errorMessage={formik.errors.phone}
          />
        </InputContainer>
        <InputExtendedContainer>
          <RichText
            placeholder="Description"
            name="description"
            onChange={(e) => {
              formik.setFieldValue('description', e);
            }}
            value={formik.values.description}
            errorMessage={formik.errors.description}
          />
        </InputExtendedContainer>
        <input type="hidden" name="uid" value={formik.values.uid} />
        <input
          type="hidden"
          id="address"
          name="address"
          value={formik.values.address}
        />
        <input type="hidden" name="lat" value={formik.values.lat} />
        <input type="hidden" name="lng" value={formik.values.lng} />
        <SubmitExtendedContainer>
          <SubmitButton
            onClick={formik.submitForm}
            disabled={!formik.isValid && formik.dirty}
          >
            Submit
          </SubmitButton>
        </SubmitExtendedContainer>
      </FormContainer>
    </PanelCard>
  );
};

const FormContainer = styled.form`
  display: flex;
  padding: 2%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(35%, 1fr));

  grid-gap: 10px;
  @media (pointer: none), (pointer: coarse) and (orientation: portrait) {
    grid-template-columns: 1fr;
    grid-gap: 2px;
  }
  overflow-x: hidden;
`;
const InputContainer = styled.div`
  display: grid;
  padding: 2px;
`;

const InputExtendedContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  align-items: center;
  @media (pointer: none), (pointer: coarse) and (orientation: portrait) {
    grid-column-end: 2;
  }
  @media (pointer: none), (pointer: coarse) and (orientation: landscape) {
    grid-column-end: 3;
  }
`;

const SubmitExtendedContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  align-items: center;
  @media (pointer: none), (pointer: coarse) and (orientation: portrait) {
    grid-column-end: 2;
  }
  @media (pointer: none), (pointer: coarse) and (orientation: landscape) {
    grid-column-end: 3;
  }
`;

const SubmitButton = styled(Button)`
  margin-top: 20px !important;
  width: 100%;
`;

const AddressContainer = styled.div`
  grid-column-start: 1;
  grid-column-end: 3;
  width: 100%;
  align-items: center;
  @media (pointer: none), (pointer: coarse) and (orientation: portrait) {
    grid-column-end: 2;
  }
  @media (pointer: none), (pointer: coarse) and (orientation: landscape) {
    grid-column-end: 3;
  }
`;

export default PostJobContent;
