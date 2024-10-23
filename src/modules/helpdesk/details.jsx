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
                {/* History */}
                <div className='border border-dark-2 rounded-xl p-4'>
                    <h4 className="text-h4">{t("History")}</h4>
                    {ticket.history?.length > 0 ? <ul className='space-y-2 border-l-4 border-themePurple/60 pl-8 pt-2 pb-4'>
                        {ticket.history.map((item, index) => (
                            <li key={index} className='flex justify-between items-center relative'>
                                <span className='absolute -left-[42px] top-2 w-4 h-4 bg-themePurple rounded-full'></span>
                                <div className='capitalize text-lg font-semibold'>{item.status}</div>
                                <div className='flex items-center gap-2'>
                                    <DisplayDate date={item.timestamp} time={true} className="text-sm" />
                                    {item.assignedTo && <span className='text-sm'>{item.assignedTo}</span>}
                                </div>
                            </li>
                        ))}
                    </ul> : <div className='text-center text-2xl text-themeGrayscale500'>{t("No history found")}</div>}
                </div>
            </div>
            <div className='text-justify'>
                <span className='text-h4 mr-4 font-medium'>{t("Issue")}</span>
                {ticket.title}
            </div>
            <div className='text-justify'>
                <span className='text-h4 mr-4 font-medium'>{t("Description")}</span>
                {ticket.description}
            </div>
            {ticket.remarks && <>
                <div className='text-justify'>
                    <span className='text-h4 mr-4 font-medium'>{t("Remarks")}</span>
                    {ticket.remarks}
                </div>
            </>}
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
                <h4 className="text-h4 mb-0 flex items-center gap-2">{t("Feedback")} <Rating value={ticket.rating} /></h4>

                <p className='text-justify'>{ticket.feedback}</p>
            </>}
        </DetailPanel>
    )
}