import { Button, CheckBox, DropDown, ModifiedBy, SearchSelect, Table } from "@/components/elements";
import CreateRemoteCategoryForm from "@/components/forms/remoteWork/create-catogory";
import FilterArea from "@/components/includes/FilterArea";
import { Edit, ThreeDotsVertical, Trash } from "@/components/svg";
import { FetchRemoteApplications, UpdateRemoteApplications } from '@/store/actions/remote-application.actions';
import { DeleteRemoteCategory, FetchRemoteCategories } from "@/store/actions/remote-category.actions";
import Toast from "@/util/toast";
import { useTranslation } from "next-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function RemoteCategoryPage() {
    const { t } = useTranslation()
    const { category_list } = useSelector(state => state.remotecategory)
    const dispatch = useDispatch()
    const [create, setCreate] = useState(false)
    const [edit, setEdit] = useState(null)
    const { application_list } = useSelector(state => state.remoteapplication)
    const [selectedApplications, setSelectedApplications] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(null)

    const getTextColor = (hexColor) => {
        // Remove the hash if it's there
        hexColor = hexColor.replace('#', '');

        // Convert hex to RGB
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);

        // Calculate brightness
        const brightness = (0.299 * r) + (0.587 * g) + (0.114 * b);

        // Determine if light or dark
        return brightness > 127.5 ? '!text-dark-6' : '!text-white';
    }


    useEffect(() => {
        dispatch(FetchRemoteCategories())
        dispatch(FetchRemoteApplications())
    }, [dispatch])

    const handleSelectApplication = (event) => {
        const id = event.target.value
        if (event.target.checked) {
            let category = application_list?.find(item => item?._id === id)?.category?._id || null
            setSelectedApplications(prev => prev.filter(item => item.category === category))
            setSelectedApplications(prev => [...prev, { id, category }])
        } else {
            setSelectedApplications(prev => prev.filter(item => item.id !== id))
        }
    }

    const handleChangeCategory = () => {
        if (selectedCategory) {
            dispatch(UpdateRemoteApplications({
                ids: selectedApplications?.reduce((acc, item) => [...acc, item.id], []),
                category: selectedCategory
            }, () => {
                setSelectedCategory(null)
                setSelectedApplications([])
                Toast.success(t("Applications updated successfully"))
            }))
        }
    }
    return (
        <section className="flex flex-col grow w-[calc(100vw-382px)]">
            <div className="flex justify-between pb-6">
                <h1 className="text-h4 mb-0">{t("Remote Categories")}</h1>
                <Button onClick={() => setCreate(true)} className={"btn btn-primary"}>{t("Create Category")}</Button>
            </div>
            <div className="zt-card grow">
                <div className="flex gap-2 mb-4">
                    {[{ _id: null, name: t("Uncategorized"), color: "#d9d9d9" }, ...category_list]?.map(item => (
                        <div className={`cursor-pointer group transition-all duration-300 relative px-4 py-2 flex items-center gap-2 rounded-lg ${getTextColor(item?.color)}`} style={{ backgroundColor: item?.color }} key={item?._id}>
                            {item?.name}
                            {item._id && <div className="items-center gap-2 transition-all duration-300 hidden group-hover:flex">
                                <span className="cursor-pointer" onClick={() => {
                                    setEdit(item)
                                    setCreate(true)
                                }}>
                                    <Edit />
                                </span>
                                <span className="cursor-pointer" onClick={() => {
                                    Toast.confirmDelete(() => {
                                        dispatch(DeleteRemoteCategory(item._id, () => {
                                            dispatch(FetchRemoteApplications())
                                            Toast.success(t("Remote Category deleted successfully"))
                                        }))
                                    }, t)
                                }}>
                                    <Trash />
                                </span>
                            </div>}
                        </div>
                    ))}
                </div>


                <div className="flex gap-2 overflow-x-auto pb-3">
                    {[{ _id: null, name: t("Uncategorized"), color: "#d9d9d9" }, ...category_list]?.map(category => (
                        <div className={`min-w-96 rounded-2xl`} style={{ backgroundColor: category?.color }} key={category?._id}>
                            <div className="px-4 py-6 flex justify-between">
                                <h4 className={`text-2xl mb-0 ${getTextColor(category?.color)}`}>
                                    {category?.name} ({application_list?.filter(app => (app?.category?._id === category?._id) || (!app?.category && category?._id === null))?.length || "0"})
                                </h4>
                            </div>
                            <div className={`p-4 h-96  overflow-y-auto bg-themeGrayscale50/10 rounded-2xl space-y-4 ${getTextColor(category?.color)}`} >
                                {
                                    selectedApplications?.length > 0 && selectedApplications.every(item => item.category === category?._id) &&
                                    <div className="flex gap-2 items-center">
                                        <CheckBox className="zt-sm"
                                            checked={selectedApplications.length === application_list?.filter(app => (app?.category?._id === category?._id) || (!app?.category && category?._id === null))?.length}
                                            id="all-category"
                                            onChange={(event) => {
                                                if (event.target.checked) {
                                                    setSelectedApplications(application_list
                                                        ?.filter(item => (item?.category?._id === category?._id) || (!item?.category && category?._id === null))
                                                        .map(item => ({ id: item?._id, category: item?.category?._id || null })))
                                                } else {
                                                    setSelectedApplications([])
                                                }
                                            }}
                                        />
                                        <SearchSelect
                                            containerClass="w-full"
                                            onChange={(value) => setSelectedCategory(value)}
                                            list={category_list?.map(item => ({ display: item?.name, value: item?._id }))}
                                            placeholder={t("Select Category")} />
                                        <Button variant="primary" disabled={!selectedCategory} onClick={handleChangeCategory}>{t("Apply")}</Button>
                                    </div>
                                }
                                {
                                    application_list?.filter(app => (app?.category?._id === category?._id) || (!app?.category && category?._id === null))
                                        ?.map((app, index) => (
                                            <div className={`flex items-center gap-2 ${getTextColor(category?.color)}`} key={index}>
                                                <CheckBox className="zt-sm"
                                                    checked={selectedApplications.findIndex(item => item.id === app?._id) !== -1}
                                                    id={app?._id}
                                                    value={app?._id}
                                                    onChange={handleSelectApplication} />
                                                <span className="text-md font-medium mb-0">{app?.name}</span>
                                            </div>
                                        ))
                                }
                            </div>
                        </div>
                    ))}
                </div>


            </div>
            {create && <CreateRemoteCategoryForm onClose={() => { setCreate(false); setEdit(null) }} object={edit} />}
        </section>
    )
}