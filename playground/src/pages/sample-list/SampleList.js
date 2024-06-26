import React, { useEffect, useMemo, useState, useCallback } from 'react';

import { useFiProxy, useFormManagerContext, useTranslation, scopeKeys } from 'component/base';
import { Card, DataGrid, Filter, Input, BasePage, withFormPage } from 'component/ui';
import SampleDefinition from '../sample-definition';
import { fullUrls } from '../../constants';

/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
  moduleName: 'playground',
  uiKey: 'u24bddfade6',
};

const SampleList = (props) => {
  const { showDialog } = useFormManagerContext();
  const [dataSource, setDataSource] = useState([]);
  const { translate } = useTranslation();
  const { executeGet, executeDelete } = useFiProxy();

  useEffect(() => {
    getDataSource();
  }, []);

  const getDataSource = (data) => {
    executeGet({ fullURL: fullUrls.Applications, enqueueSnackbarOnError: false }).then((response) => {
      if (response) {
        setDataSource(Object.values(response));
      }
    });
  };

  const deleteData = (id) => {
    if (id) {
      executeDelete({ fullURL: fullUrls.Applications + id, enqueueSnackbarOnError: false }).then((response) => {
        if (response) {
          getDataSource();
        }
      });
    }
  };

  const columns = useMemo(() => {
    return [
      { name: 'id', header: translate('Id') },
      { name: 'name', header: translate('Name') },
      { name: 'surname', header: translate('Surname') },
      { name: 'age', header: translate('Age') },
      { name: 'reasonForApplication', header: translate('Reason For Application') },
      { name: 'createDate', header: translate('Create Date') },
      { name: 'tcNo', header: translate('TC No') },
      { name: 'adress', header: translate('Address') },
      { name: 'adminResponse', header: translate('Admin Response') },
      { name: 'applicationStatus', header: translate('Application Status') },
      { name: 'applicationCode', header: translate('Application Code') },
    ];
  }, []);

  const onActionClick = (action) => {};

  const addClicked = useCallback(() => {
    showDialog({
      title: translate('Application add'),
      content: <SampleDefinition />,
      callback: (data) => {
        if (data) {
          getDataSource();
        }
      },
    });
  }, []);

  const editClicked = useCallback((id, data) => {
    data &&
      showDialog({
        title: translate('Application edit'),
        content: <SampleDefinition data={data} />,
        callback: () => {
          getDataSource();
        },
      });
  }, []);

  const deleteClicked = useCallback((id, data) => {
    data && deleteData(data.id);
  }, []);

  const gridActionList = useMemo(
    () => [
      {
        name: 'delete',
        onClick: deleteClicked,
        scopeKey: scopeKeys.Create_Loan,
      },
      {
        name: 'edit',
        onClick: editClicked,
        scopeKey: scopeKeys.Create_Loan,
      },
    ],
    [deleteClicked, editClicked],
  );

  const cardActionList = useMemo(
    () => [
      {
        name: 'Add',
        icon: 'add',
        onClick: addClicked,
        scopeKey: scopeKeys.Create_Loan,
      },
    ],
    [addClicked],
  );

  return (
    <BasePage {...props} onActionClick={onActionClick}>
      <Card scopeKey={scopeKeys.View_Loan} showHeader={true} actionList={cardActionList}>
        <DataGrid
          dataSource={dataSource}
          columns={columns}
          actionList={gridActionList}
          autoSizeAllColumns
          idProperty="id"
          enableFiltering={true}
        />
      </Card>
    </BasePage>
  );
};
SampleList.displayName = 'SampleList';

export default withFormPage(SampleList, { uiMetadata });
