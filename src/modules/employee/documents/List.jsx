import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';
import { Button, CheckBox, DisplayDate, DropDown, SearchSelect, Table } from '@/components/elements';
import FileUpload from '@/components/elements/FileUpload';
import { uploader } from '@/util/helpers';
import { FetchEmployees } from "@/store/actions/employee.actions";
import { useDispatch, useSelector } from "react-redux";
import { CloseCross, CrossClose, Download, Edit, EyeOn, Plus, ThreeDotsVertical, Trash } from '@/components/svg';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Toast from '@/util/toast';
import { CreateDocument, DeleteDocument } from '@/store/actions/employee-document.actions';

export default function DocumentList() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const [sortCol, setSortCol] = useState(null);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(null);
    const { employee_details } = useSelector((state) => state.employee);
    const [sortDir, setSortDir] = useState(null);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const { customfield_list } = useSelector(state => state.customfield);
    const [newDocument, setNewDocument] = useState({ documentType: '', attachment: null, documentPath: '', uploadedDate: '' });

    useEffect(() => {
        console.log('employee_details', employee_details)
        if (!employee_details) {
            dispatch(FetchEmployees());
        }
    }, [dispatch, employee_details]);

    const editHandler = (item) => {
        setEdit({ ...item });
        setAdd(true);
      };
    const deleteHandler = (item) => {
        Toast.confirmDelete(() => {
          dispatch(
            DeleteDocument(item._id, () => {
              Toast.success(t("Document deleted successfully"));
            })
          );
        }, t);
      };

    const headings = [
        { title: t("Document Type"), col: "documentType", sort: true },
        { title: t("Choose File"), col: "attachment", sort: false },
        { title: t("Download"), col: "download", sort: false },
        { title: t("Uploaded Date"), col: "uploadedDate", sort: false },
        { title: t("Action"), col: "action" },
    ];

    const rows = employee_details?.documents.map(item => ({
        documentType: item?.documentType?.name,
        attachment: item?.attachment,
        download: <Button type="button" variant={'light-primary'} className={'!p-2'}>
        <Download className={'h-4 w-4'} />
    </Button>,
        uploadedDate:  <DisplayDate  date={item?.uploadedDate}/> ,
        action: <DropDown icon={<ThreeDotsVertical />}>
            <ul className="zt-themeDropDownList zt-sm gap-4">
                <li className="!p-0">
                    <a onClick={() => { /* View action here */ }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                        <span className='flex gap-2'><EyeOn /> {t("View")}</span>
                    </a>
                </li>
                <li className="!p-0">
                    <a onClick={() => { /* Edit action here */ }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                        <span className='flex gap-2'><Edit /> {t("Edit")}</span>
                    </a>
                </li>
                <li className="!p-0">
                    <a onClick={() => {
                            deleteHandler(item);
                        }} className={'flex items-center no-underline gap-2 cursor-pointer font-normal hover:text-themeDanger'}>
                        <span className='flex gap-2'><Trash /> {t("Delete")}</span>
                    </a>
                </li>
            </ul>
        </DropDown>
    }));

    const handleToggleForm = () => {
        setAdd(prev => !prev);
        if (add) {
            setNewDocument({ documentType: '', attachment: null, documentPath: '', uploadedDate: '' });
        }
    };

    const formik = useFormik({
        initialValues: {
            documentType: '',
            attachment: null,
            documentPath: '',
            uploadedDate: new Date().toLocaleDateString(),
        },
        validationSchema: Yup.object().shape({
            documentType: Yup.string().required(t('Document Type is Required')),
        }),
        onSubmit: async (values) => {
            if (!employee_details?._id) {
                return Toast.error("User ID is missing");
              }
              if (values.attachment) {
                await uploader(values.attachment, (url) => {
                  const valuesToSubmit = {
                    ...values,
                    attachment: url,
                    documentPath: url,
                    user: employee_details._id 
                  };
                  dispatch(CreateDocument(valuesToSubmit, () => {
                    Toast.success("Document added successfully");
                    formik.resetForm();
                    setAdd(false);
                  }));
                });
              }
        },
        enableReinitialize: true
    });

    const pagination = {
        totalRecords: employee_details?.documents.length,
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    };

    return (
        <div className='zt-employeeCard'>
            <div className='zt--employeeCardHead'>
                <h3>{t('Documents')}</h3>
                <span onClick={handleToggleForm} className='flex gap-2 cursor-pointer'>
                    {add ? (
                        <>
                            <span className='flex gap-2'><CloseCross /> {t("Close Form")}</span>
                        </>
                    ) : (
                        <>
                            <Plus /> {t("Add Document")}
                        </>
                    )}
                </span>
            </div>

            <div className='zt--employeeCardBody'>
                <Table
                    headings={headings}
                    rows={add ? [...rows, {
                        documentType: <SearchSelect 
                            list={customfield_list.filter(item => item.type === 'document_type').map(item => {
                                return { display: item.name, value: item._id }
                            })}
                            required={true} 
                            name='documentType'
                            value={formik.values.documentType}
                            onChange={value => {
                                formik.setFieldValue('documentType', value);
                                const selected = customfield_list.find(item => item._id === value);
                                setNewDocument({
                                    ...newDocument,
                                    documentType: selected ? selected.name : '',
                                });
                            }}
                        />,
                        attachment: <FileUpload
                            id={'attachment'}
                            name={'attachment'}
                            label={t('Upload Attachment')}
                            accept={`image/*,application/pdf,.doc,.docx`}
                            onChange={(file) => {
                                formik.setFieldValue('attachment', file);
                                setNewDocument({
                                    ...newDocument,
                                    documentPath: file.name, 
                                    uploadedDate: new Date().toLocaleDateString()
                                });
                                formik.setFieldValue('documentPath', file.name);
                                formik.setFieldValue('uploadedDate', new Date().toLocaleDateString());
                            }}
                        />,
                        documentPath: newDocument.documentPath,
                        uploadedDate: newDocument.uploadedDate,
                        action: <button type='submit' onClick={formik.handleSubmit}>{t('Save')}</button>
                    }] : rows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    pagination={pagination}
                    className={'zt-employeeTable zt-documentTable'}
                />
            </div>
        </div>
    );
}
