import { Button, DetailPanel, DisplayDate, Rating } from '@/components/elements';
import { useTranslation } from 'next-i18next'
import { IoCloudDownloadOutline as Download } from "react-icons/io5";




export default function TicketDetails({ onClose, ticket }) {
    const { t } = useTranslation()
    const col1Class = "font-medium"
    const col2Class = "capitalize"

    return (
        <DetailPanel title={t("Ticket Details")} onClose={onClose}>
            <h4 className="text-h4 mb-2">{t("Ticket Details")}</h4>
            <div className="grid grid-cols-2 gap-4 p-2">
                {/* Overview */}
                <div className="border border-dark-2 rounded-xl p-4">
                    <h4 className="text-2xl font-medium">{t("Overview")}</h4>
                    <div className='grid grid-cols-2 gap-2 items-center'>
                        <span className={col1Class}>{t("Ticket ID")}</span>
                        <span className={col2Class}>{ticket.ticketId}</span>
                        <span className={col1Class}>{t("Created At")}</span>
                        <span className={col2Class}><DisplayDate date={ticket.createdAt} /></span>
                        <span className={col1Class}>{t("Issue Type")}</span>
                        <span className={col2Class}>{ticket.type}</span>
                        {ticket.hardwareType && <>
                            <span className={col1Class}>{t("Sub Type")}</span>
                            <span className={col2Class}>{ticket.hardwareType}</span>
                        </>}
                        <span className={col1Class}>{t("Status")}</span>
                        <span className={col2Class}>{ticket.status}</span>
                        <span className={col1Class}>{t("Priority")}</span>
                        <span className={col2Class}>{ticket.priority}</span>
                        <span className={col1Class}>{t("Requested by")}</span>
                        <span className={col2Class}>{ticket.createdBy?.firstName} {ticket.createdBy?.lastName}</span>
                        <span className={col1Class}>{t("Assigned to")}</span>
                        <span className={col2Class}>{ticket.assignedTo ? `${ticket.assignedTo?.firstName} ${ticket.assignedTo?.lastName}` : "------"}</span>
                    </div>
                </div>
                <div className='border border-dark-2 rounded-xl p-4'>
                    <h4 className="text-2xl mb-0 font-medium">{t("Issue")}</h4>
                    <p className='text-justify'>{ticket.title}</p>
                    <h4 className="text-2xl mb-0 font-medium">{t("Description")}</h4>
                    <p className='text-justify'>{ticket.description}</p>
                    {ticket.remarks && <>
                        <h4 className="text-2xl mb-0 font-medium">{t("Remarks")}</h4>
                        <p className='text-justify'>{ticket.remarks}</p>
                    </>}
                </div>
            </div>
            {
                ticket.attachment && <>
                    <h4 className="text-h4 mb-0">{t("Attachment")}</h4>
                    <a href={ticket.attachment} target="_blank" >
                        <Button variant="primary" size="sm">
                            <Download />
                            {t("Download")}
                        </Button>
                    </a>
                </>
            }
            {ticket.feedback && <>
                <h4 className="text-h4 mb-0">{t("Feedback")}</h4>
                <Rating value={ticket.rating} />
                <p className='border border-dark-2 rounded-xl p-4 text-justify'>{ticket.feedback}</p>
            </>}
        </DetailPanel>
    )
}