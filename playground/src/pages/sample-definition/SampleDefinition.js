import React, { useEffect, useRef, useState } from 'react';
import { useFiProxy, useTranslation, scopeKeys } from 'component/base';
import { BasePage, Card, Input, Select, withFormPage } from 'component/ui';
import { fullUrls } from '../../constants';
import { generateUIKey } from '../../../../.config/utils';
import { applicationStatus } from '../../constants';

/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
  moduleName: 'playground',
  uiKey: 'u7e7c13a017',
};

const SampleDefinition = ({ close, isBpm, Id, ...rest }) => {
  const { translate } = useTranslation();
  const [dataModel, setDataModel] = useState({});
  const [isUpdatePage, setUpdatePage] = useState(false);
  const [tcNoHelperText, setTcNoHelperText] = useState('');

  const { executeGet, executePost, executePut } = useFiProxy();

  const nameRef = useRef();
  const surnameRef = useRef();
  const ageRef = useRef();
  const tcNoRef = useRef();
  const reasonForApplicationRef = useRef();
  const adressRef = useRef();
  const adminResponseRef = useRef();

  useEffect(() => {
    setUpdatePage(Boolean(rest.data));
    rest.data && getSampleData(rest.data.id);
  }, []);

  const getSampleData = (Id) => {
    executeGet({ fullURL: fullUrls.Applications + Id, enqueueSnackbarOnError: false }).then((response) => {
      if (response) {
        setDataModel(response);
      }
    });
  };

  const onActionClick = (action) => {
    if (action.commandName === 'Save') {
      if (tcNoRef.current.value.length !== 11) {
        setTcNoHelperText(translate('Tc No Helper Text'));
        return;
      }

      const commonData = {
        ...dataModel,
        name: nameRef.current.value,
        surname: surnameRef.current.value,
        age: ageRef.current.value,
        tcNo: tcNoRef.current.value,
        reasonForApplication: reasonForApplicationRef.current.value,
        adress: adressRef.current.value,
      };

      if (isUpdatePage) {
        const data = {
          ...commonData,
          adminResponse: adminResponseRef.current.value,
        };

        executePut({
          fullURL: fullUrls.Applications + rest.data.id,
          data,
          enqueueSnackbarOnError: false,
        }).then((response) => {
          if (response) {
            close();
          }
        });
      } else {
        const applicationCode = generateUIKey();
        const data = {
          ...commonData,
          applicationCode,
          applicationStatus: applicationStatus.PENDING,
          adminResponse: '',
        };

        executePost({
          fullURL: fullUrls.Applications,
          data,
          enqueueSnackbarOnError: false,
        }).then((response) => {
          if (response) {
            close(data);
          }
        });
      }
    } else if (action.commandName == 'Cancel') {
      close && close(false);
    }
  };

  const onValueChanged = (field, value) => {
    setDataModel({ ...dataModel, [field]: value });
  };

  const getApplicationStatusSelectOptions = () => {
    const outputArray = Object.entries(applicationStatus).map(([key, value], index) => ({
      name: value,
      code: index + 1,
    }));

    return outputArray;
  };

  return (
    <BasePage
      {...rest}
      onActionClick={onActionClick}
      actionList={[{ name: 'Cancel' }, { name: 'Save', scopeKey: scopeKeys.Create_Loan }]}
    >
      <Card scopeKey={scopeKeys.Create_Loan}>
        <Input xs={6} required ref={nameRef} label={translate('Name')} value={dataModel.name} />
        <Input xs={6} required ref={surnameRef} label={translate('Surname')} value={dataModel.surname} />
        <Input
          xs={6}
          required
          ref={ageRef}
          label={translate('Age')}
          value={dataModel.age}
          type="number"
          minValue="1"
          maxValue="150"
        />
        <Input
          xs={6}
          required
          ref={tcNoRef}
          label={translate('TC No')}
          value={dataModel.tcNo}
          type="number"
          helperText={tcNoHelperText}
        />
        <Input
          xs={6}
          required
          ref={reasonForApplicationRef}
          label={translate('Reason For Application')}
          value={dataModel.reasonForApplication}
        />
        <Input xs={6} required ref={adressRef} label={translate('Address')} value={dataModel.adress} />
        {isUpdatePage && (
          <>
            <Select
              name="applicationStatus"
              style={{ marginBottom: '1rem' }}
              label={translate('Application Status')}
              datasource={getApplicationStatusSelectOptions()}
              onChange={(value) => onValueChanged('applicationStatus', value)}
              columns={['name']}
              valuePath={'name'}
              value={dataModel.applicationStatus}
            />
            <Input
              ref={adminResponseRef}
              label={translate('Admin Response')}
              value={dataModel.adminResponse}
              multiline
            />
          </>
        )}
      </Card>
    </BasePage>
  );
};

export default withFormPage(SampleDefinition, { uiMetadata });
