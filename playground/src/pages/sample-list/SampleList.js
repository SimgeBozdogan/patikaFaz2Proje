import React, { useEffect, useMemo, useState, useCallback } from 'react';

import {
  useAuthenticationContext,
  useFiProxy,
  useFormManagerContext,
  useSnackbar,
  useTranslation,
  scopeKeys,
  stringFormat,
} from 'component/base';
import { Card, DataGrid, Filter, Input, BasePage, withFormPage } from 'component/ui';

import SampleDefinition from '../sample-definition';
import { apiUrls } from '../../constants';

/**
 * UI unique identifier meta-data.
 */
const uiMetadata = {
  moduleName: 'playground',
  uiKey: 'u24bddfade6',
};

const SampleList = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const { tenant } = useAuthenticationContext();
  const { showDialog } = useFormManagerContext();
  const [dataSource, setDataSource] = useState([]);
  const { translate } = useTranslation();

  const { executeGet, executeDelete } = useFiProxy();

  useEffect(() => {
    getDataSource();
  }, []);

  const getDataSource = (data) => {
    // executeGet({ url: apiUrls.TestDefinitionsApi, setStateDelegate: setDataSource });
    // executeGet({ url: `https://api.sampleapis.com/cartoons/cartoons2D` }).then((response) => {
    //   if (response.Value) {
    //     setDataSource(response.Value);
    //   }
    // });

    if (data?.Id) {
      executeGet({ url: stringFormat(apiUrls.MetaDataCountriesById, data.Id) }).then((response) => {
        if (response.Value) {
          setDataSource([response.Value]);
        }
      });
    } else {
      // executeGet({ url: apiUrls.MetaDataCountries }).then((response) => {
      //   if (response.Value) {
      //     setDataSource(response.Value);
      //   }
      // });
      const data = [
        {
          adress: 'adress 1',
          age: 70,
          reasonForApplication: 'reasonForApplication 1',
          surname: 'surname 1',
          tcNo: 23,
          name: 'name 1',
          attachment: 'attachment 1',
          applicationCode: 'applicationCode 1',
          createDate: 1704160210,
          applicationStatus: 'Çözüldü',
          adminResponse: 'BAşvuru çozümlendi.',
          id: '1',
        },
        {
          adress: 'adress 2',
          age: 76,
          reasonForApplication: 'reasonForApplication 2',
          surname: 'surname 2',
          tcNo: 100,
          name: 'name 2',
          attachment: 'attachment 2',
          applicationCode: 'applicationCode 2',
          createDate: 1704160150,
          applicationStatus: 'applicationStatus 2',
          adminResponse: 'adminResponse 2',
          id: '2',
        },
        {
          adress: 'adress 3',
          age: 50,
          reasonForApplication: 'reasonForApplication 3',
          surname: 'surname 3',
          tcNo: 15,
          name: 'name 3',
          attachment: 'attachment 3',
          applicationCode: 'applicationCode 3',
          createDate: 1704160090,
          applicationStatus: 'applicationStatus 3',
          adminResponse: 'adminResponse 3',
          id: '3',
        },
        {
          adress: 'adress 4',
          age: 3,
          reasonForApplication: 'reasonForApplication 4',
          surname: 'surname 4',
          tcNo: 7,
          name: 'name 4',
          attachment: 'attachment 4',
          applicationCode: 'applicationCode 4',
          createDate: 1704160030,
          applicationStatus: 'Bekliyor',
          adminResponse: 'adminResponse 4',
          id: '4',
        },
        {
          adress: 'adress 5',
          age: 36,
          reasonForApplication: 'reasonForApplication 5',
          surname: 'surname 5',
          tcNo: 58,
          name: 'name 5',
          attachment: 'attachment 5',
          applicationCode: 'applicationCode 5',
          createDate: 1704159970,
          applicationStatus: 'applicationStatus 5',
          adminResponse: 'adminResponse 5',
          id: '5',
        },
        {
          adress: 'adress 6',
          age: 55,
          reasonForApplication: 'reasonForApplication 6',
          surname: 'surname 6',
          tcNo: 89,
          name: 'name 6',
          attachment: 'attachment 6',
          applicationCode: 'applicationCode 6',
          createDate: 1704159910,
          applicationStatus: 'applicationStatus 6',
          adminResponse: 'adminResponse 6',
          id: '6',
        },
        {
          adress: 'adress 7',
          age: 95,
          reasonForApplication: 'reasonForApplication 7',
          surname: 'surname 7',
          tcNo: 88,
          name: 'name 7',
          attachment: 'attachment 7',
          applicationCode: 'applicationCode 7',
          createDate: 1704159850,
          applicationStatus: 'applicationStatus 7',
          adminResponse: 'adminResponse 7',
          id: '7',
        },
        {
          adress: 'adress 8',
          age: 21,
          reasonForApplication: 'reasonForApplication 8',
          surname: 'surname 8',
          tcNo: 69,
          name: 'name 8',
          attachment: 'attachment 8',
          applicationCode: 'applicationCode 8',
          createDate: 1704159790,
          applicationStatus: 'applicationStatus 8',
          adminResponse: 'adminResponse 8',
          id: '8',
        },
        {
          adress: 'adress 9',
          age: 20,
          reasonForApplication: 'reasonForApplication 9',
          surname: 'surname 9',
          tcNo: 21,
          name: 'name 9',
          attachment: 'attachment 9',
          applicationCode: 'applicationCode 9',
          createDate: 1704159730,
          applicationStatus: 'applicationStatus 9',
          adminResponse: 'adminResponse 9',
          id: '9',
        },
        {
          adress: 'adress 10',
          age: 1,
          reasonForApplication: 'reasonForApplication 10',
          surname: 'surname 10',
          tcNo: 92,
          name: 'name 10',
          attachment: 'attachment 10',
          applicationCode: 'applicationCode 10',
          createDate: 1704159670,
          applicationStatus: 'applicationStatus 10',
          adminResponse: 'adminResponse 10',
          id: '10',
        },
        {
          adress: 'adress 11',
          age: 76,
          reasonForApplication: 'reasonForApplication 11',
          surname: 'surname 11',
          tcNo: 96,
          name: 'name 11',
          attachment: 'attachment 11',
          applicationCode: 'applicationCode 11',
          createDate: 1704159610,
          applicationStatus: 'applicationStatus 11',
          adminResponse: 'adminResponse 11',
          id: '11',
        },
        {
          adress: 'adress 12',
          age: 48,
          reasonForApplication: 'reasonForApplication 12',
          surname: 'surname 12',
          tcNo: 46,
          name: 'name 12',
          attachment: 'attachment 12',
          applicationCode: 'applicationCode 12',
          createDate: 1704159550,
          applicationStatus: 'applicationStatus 12',
          adminResponse: 'adminResponse 12',
          id: '12',
        },
        {
          adress: 'adress 13',
          age: 50,
          reasonForApplication: 'reasonForApplication 13',
          surname: 'surname 13',
          tcNo: 78,
          name: 'name 13',
          attachment: 'attachment 13',
          applicationCode: 'applicationCode 13',
          createDate: 1704159490,
          applicationStatus: 'applicationStatus 13',
          adminResponse: 'adminResponse 13',
          id: '13',
        },
        {
          adress: 'adress 14',
          age: 78,
          reasonForApplication: 'reasonForApplication 14',
          surname: 'surname 14',
          tcNo: 66,
          name: 'name 14',
          attachment: 'attachment 14',
          applicationCode: 'applicationCode 14',
          createDate: 1704159430,
          applicationStatus: 'applicationStatus 14',
          adminResponse: 'adminResponse 14',
          id: '14',
        },
        {
          adress: 'adress 15',
          age: 37,
          reasonForApplication: 'reasonForApplication 15',
          surname: 'surname 15',
          tcNo: 16,
          name: 'name 15',
          attachment: 'attachment 15',
          applicationCode: 'applicationCode 15',
          createDate: 1704159370,
          applicationStatus: 'applicationStatus 15',
          adminResponse: 'adminResponse 15',
          id: '15',
        },
        {
          adress: 'adress 16',
          age: 95,
          reasonForApplication: 'reasonForApplication 16',
          surname: 'surname 16',
          tcNo: 90,
          name: 'name 16',
          attachment: 'attachment 16',
          applicationCode: 'applicationCode 16',
          createDate: 1704159310,
          applicationStatus: 'applicationStatus 16',
          adminResponse: 'adminResponse 16',
          id: '16',
        },
        {
          adress: 'adress 17',
          age: 26,
          reasonForApplication: 'reasonForApplication 17',
          surname: 'surname 17',
          tcNo: 1,
          name: 'name 17',
          attachment: 'attachment 17',
          applicationCode: 'applicationCode 17',
          createDate: 1704159250,
          applicationStatus: 'applicationStatus 17',
          adminResponse: 'adminResponse 17',
          id: '17',
        },
        {
          adress: 'adress 18',
          age: 77,
          reasonForApplication: 'reasonForApplication 18',
          surname: 'surname 18',
          tcNo: 21,
          name: 'name 18',
          attachment: 'attachment 18',
          applicationCode: 'applicationCode 18',
          createDate: 1704159190,
          applicationStatus: 'applicationStatus 18',
          adminResponse: 'adminResponse 18',
          id: '18',
        },
        {
          adress: 'adress 19',
          age: 23,
          reasonForApplication: 'reasonForApplication 19',
          surname: 'surname 19',
          tcNo: 35,
          name: 'name 19',
          attachment: 'attachment 19',
          applicationCode: 'applicationCode 19',
          createDate: 1704159130,
          applicationStatus: 'applicationStatus 19',
          adminResponse: 'adminResponse 19',
          id: '19',
        },
        {
          adress: 'adress 20',
          age: 84,
          reasonForApplication: 'reasonForApplication 20',
          surname: 'surname 20',
          tcNo: 26,
          name: 'name 20',
          attachment: 'attachment 20',
          applicationCode: 'applicationCode 20',
          createDate: 1704159070,
          applicationStatus: 'applicationStatus 20',
          adminResponse: 'adminResponse 20',
          id: '20',
        },
        {
          adress: 'adress 21',
          age: 42,
          reasonForApplication: 'reasonForApplication 21',
          surname: 'surname 21',
          tcNo: 88,
          name: 'name 21',
          attachment: 'attachment 21',
          applicationCode: 'applicationCode 21',
          createDate: 1704159010,
          applicationStatus: 'applicationStatus 21',
          adminResponse: 'adminResponse 21',
          id: '21',
        },
        {
          adress: 'Adress',
          age: 22,
          reasonForApplication: 'Nedensiz',
          surname: 'Bozdogan',
          tcNo: '15165165156',
          name: 'simge',
          attachment: 'log-p-convexfunctions.pdf',
          applicationCode: 'iQtOFEhojSO9kPrD',
          createDate: 1704159758,
          applicationStatus: 'İptal edildi',
          adminResponse: 'İptal edilen başvuru...',
          id: '22',
        },
        {
          adress: 'adressss',
          age: 15,
          reasonForApplication: 'nedensiz',
          surname: 'ABC',
          tcNo: '12345678912',
          name: 'ABC',
          attachment: 'benim resmim.jpg',
          applicationCode: 'fZewmLKUyae1m4Dn',
          createDate: 1704176104,
          applicationStatus: 'Bekliyor',
          adminResponse: 'adminResponse 23',
          id: '23',
        },
        {
          adress: 'asfdfhfdh',
          age: 12,
          reasonForApplication: 'sdgah',
          surname: 'sdgdhffg',
          tcNo: '12345678912',
          name: 'afszdgdfh',
          attachment: 'benim resmim.jpg',
          applicationCode: 'ilYketAr3kL2tbwL',
          createDate: 1704176460,
          applicationStatus: 'Bekliyor',
          adminResponse: 'adminResponse 24',
          id: '24',
        },
        {
          adress: 'dkfjkenfıgemr',
          age: 24,
          reasonForApplication: 'lfksdjfw',
          surname: 'bozdogan',
          tcNo: '12345678912',
          name: 'simge',
          attachment: 'benim resmim.jpg',
          applicationCode: 'cRXxS6u3zol8baiw',
          createDate: 1704180386,
          applicationStatus: 'Bekliyor',
          adminResponse: 'adminResponse 25',
          id: '25',
        },
        {
          adress: 'asfdfhfdh',
          age: 12,
          reasonForApplication: 'sdgah',
          surname: 'sdgdhffg',
          tcNo: '12345678912',
          name: 'afszdgdfh',
          attachment: 'cse415-fundamentals-of-cloud-computing-week-5.pdf',
          applicationCode: 'gGPYuHov4AFHQ0ON',
          createDate: 1704182684,
          applicationStatus: 'Bekliyor',
          adminResponse: 'adminResponse 26',
          id: '26',
        },
        {
          adress: 'xxx',
          age: 31,
          reasonForApplication: 'xxx',
          surname: 'xxxx',
          tcNo: '22131124112',
          name: 'xxx',
          attachment: 'Default.rdp',
          applicationCode: 'u7ogKEnjzEENaMlf',
          createDate: 1704182818,
          applicationStatus: 'İptal edildi',
          adminResponse: 'Cancelled',
          id: '27',
        },
        {
          adress: 'sdsa',
          age: 1231,
          reasonForApplication: 'tes',
          surname: 'test',
          tcNo: '31231213221',
          name: 'çağlayan ',
          attachment: 'Creatorbook V2.zip',
          applicationCode: 'RYHcmcPHb4WU61CD',
          createDate: 1704306440,
          applicationStatus: 'Bekliyor',
          adminResponse: 'adminResponse 28',
          id: '28',
        },
      ];

      setDataSource(data);
    }
  };

  const deleteData = (id) => {
    if (id) {
      executeDelete({ url: stringFormat(apiUrls.sampleApi, id) }).then((response) => {
        if (response.Success && response.Value) {
          getDataSource();
        }
      });
    }
  };

  const columns = useMemo(() => {
    return [
      { name: 'id', header: translate('Id') },
      { name: 'adminResponse', header: translate('Admin Response') },
      { name: 'applicationStatus', header: translate('Application Status') },
      { name: 'createDate', header: translate('Create Date') },
      { name: 'applicationCode', header: translate('Application Code') },
      { name: 'attachment', header: translate('Attachment') },
      { name: 'name', header: translate('Name') },
      { name: 'surname', header: translate('Surname') },
      { name: 'tcNo', header: translate('TC No') },
      { name: 'reasonForApplication', header: translate('Reason For Application') },
      { name: 'age', header: translate('Age') },
      { name: 'adress', header: translate('Address') },
    ];
  }, []);

  const onActionClick = (action) => {};

  const addClicked = useCallback(() => {
    showDialog({
      title: translate('Sample add'),
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
        title: translate('Sample edit'),
        content: <SampleDefinition data={data} />,
        callback: () => {
          getDataSource();
        },
      });
  }, []);

  const deleteClicked = useCallback((id, data) => {
    data && deleteData(data.Id);
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
      <Filter onFilter={(data) => getDataSource(data)}>
        <Input name={'Id'} label={translate('Id')} primaryFilter />
      </Filter>
      <Card scopeKey={scopeKeys.View_Loan} showHeader={true} actionList={cardActionList}>
        <DataGrid
          dataSource={dataSource}
          columns={columns}
          actionList={gridActionList}
          autoSizeAllColumns
          idProperty="Id"
        />
      </Card>
    </BasePage>
  );
};
SampleList.displayName = 'SampleList';

export default withFormPage(SampleList, { uiMetadata });
