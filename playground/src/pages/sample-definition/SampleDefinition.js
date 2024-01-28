import React, { useEffect, useRef, useState } from 'react';
import { useAuthenticationContext, useFiProxy, useSnackbar, useTranslation, scopeKeys } from 'component/base';
import { BasePage, Card, Input, withFormPage } from 'component/ui';
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
  const { tenant, user } = useAuthenticationContext();
  const { enqueueSnackbar } = useSnackbar();

  const [dataModel, setDataModel] = useState({});

  const nameRef = useRef();
  const surnameRef = useRef();
  const ageRef = useRef();
  const tcNoRef = useRef();
  const reasonForApplicationRef = useRef();
  const adressRef = useRef();

  const { executeGet, executePost, executePut } = useFiProxy();

  useEffect(() => {
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
    const applicationCode = generateUIKey();

    const data = {
      ...dataModel,
      name: nameRef.current.value,
      surname: surnameRef.current.value,
      age: ageRef.current.value,
      tcNo: tcNoRef.current.value,
      reasonForApplication: reasonForApplicationRef.current.value,
      adress: adressRef.current.value,
      applicationCode,
      applicationStatus: applicationStatus.PENDING,
    };

    if (action.commandName === 'Save') {
      if (rest.data) {
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
          minLength="11"
          maxLength="11"
          type="number"
        />
        <Input
          xs={6}
          required
          ref={reasonForApplicationRef}
          label={translate('Reason For Application')}
          value={dataModel.reasonForApplication}
        />
        <Input xs={6} required ref={adressRef} label={translate('Address')} value={dataModel.adress} />
      </Card>
    </BasePage>
  );
};

export default withFormPage(SampleDefinition, { uiMetadata });
