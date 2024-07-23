import { useState } from 'react'
import BaseForm from "../BaseForm";
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { CreateEmployee, UpdateEmployee } from "@/store/actions/employee.actions";
import Toast from "@/util/toast";
import { CheckBox, Table } from '@/components/elements';

export default function CreateWarningDetailForm({ onClose, object }) {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { is_loading } = useSelector((state) => state.employee);
    const formik = useFormik({
        initialValues: {
            warningTitle: "",
            description: "",
        },
        validationSchema: Yup.object().shape({
            warningTitle: Yup.string().required(t('Warning Title Required')),
            description: Yup.string().required(t('description Required')),
        }),
        onSubmit: async (values) => {
            return object ? dispatch(UpdateEmployee(employee._id, values, onCompleted)) : dispatch(CreateEmployee(values, onCompleted));
        }
    });

    const onCompleted = () => {
        Toast.success(object ? t("Employee updated successfully") : t("Employee created successfully"));
        onClose();
    };
    const [sortCol, setSortCol] = useState(null)
    const [sortDir, setSortDir] = useState(null)
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10) 
    const headings = [
    
        { title: t("Title"), col: "Title", },
        { title: t("Warning Detail"), col: "WarningDatail", },  
    ]
    const rows = [
        {
            sr: <div className="flex items-center">
            <CheckBox
                id={`01`}
                // name={`checkbox-${index}`}
                // checked={checkedItems[index] || false}
                // onChange={(e) => handleCheckItem(index, e.target.checked)}
                size={'sm'}
                variant={'dark'}
            />
        </div>,
        SerailNo: '1',
        Title:"Complete Deadline",
        WarningDatail:"-"
        },
        {
            sr: <div className="flex items-center">
            <CheckBox
                id={`02`}
                // name={`checkbox-${index}`}
                // checked={checkedItems[index] || false}
                // onChange={(e) => handleCheckItem(index, e.target.checked)}
                size={'sm'}
                variant={'dark'}
            />
        </div>,
        SerailNo: '2',
        Title:"Complete Deadline",
        WarningDatail:"-"
        }
    ]
    const pagination = { 
        showPerPage: true,
        prevAction: () => page > 1 && setPage(page - 1),
        clickAction: (value) => setPage(value),
        nextAction: () => setPage(page + 1),
    }
    return (
        <BaseForm title={object ? "Warning Detail" : "Warning Detail"} formik={formik} onClose={onClose} is_loading={is_loading}>
            <div className='col-span-2'>
                <Table
                    headings={headings}
                    rows={rows}
                    sortCol={sortCol}
                    setSortCol={setSortCol}
                    sortDir={sortDir}
                    setSortDir={setSortDir}
                    perPage={perPage}
                    setPerPage={setPerPage}
                    page={page}
                    setPage={setPage}
                    pagination={pagination}
                    className={'zt-employeeTable zt-assetsTable'}
                />
                <h2 className='text-h4 text-left mb-2'>{t("Complete Deadline")}</h2>
                <p className='text-left'>{t('Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quos, pariatur placeat voluptatem esse neque itaque rem sapiente perferendis dolorum, iusto, eos nam voluptate tempore! Id quod fugiat est qui.')}</p>
                <h2 className='text-h4 text-left mb-2'>{t("Project Deadline")}</h2>
                <p className='text-left'>{t('Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae quos, pariatur placeat voluptatem esse neque itaque rem sapiente perferendis dolorum, iusto, eos nam voluptate tempore! Id quod fugiat est qui.')}</p>
             </div>
        </BaseForm>
    );
}
