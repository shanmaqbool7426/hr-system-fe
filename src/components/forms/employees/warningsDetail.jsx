import { useTranslation } from "next-i18next";
import { useDispatch, useSelector } from "react-redux";
import { Button, DetailPanel } from '@/components/elements';

export default function WarningDetail({ onClose, object }) {
    const { t } = useTranslation();
  

    return (
        <DetailPanel>
        <div className="zt-customScrollbar overflow-y-auto px-6 h-[calc(100dvh_-_120px)]">
        <h4>{t('Warning Issue detail')}</h4>
        <div className='text-left'>
            <h5>{t('Title')}</h5>
            <p>{object?.name}</p>
            <h5>{t('Description')}</h5>
            <p>{object?.description}</p>
        </div>
        </div>
        <div className="zt-btns">
            <Button type="button" value={t("Close")} className={"btn w-full btn-primary-outline"} onClick={onClose} />
        </div>
    </DetailPanel>
    );
}
