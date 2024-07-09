import { useTranslation } from "next-i18next";
import ChatHistory from "@/modules/connect/ChatHistory";
import Chat from "@/modules/connect/Chat";
// import { Button } from "@/components/elements";

export default function ChatPage() {
	const { t } = useTranslation()

	return (
		<section className="flex flex-col grow">
			{/* {is_loading && <PageLoader/>} */}
			<div className="flex justify-between pb-6">
				<div className="flex flex-col">
					<h1 className="text-h4 mb-0">{t("Chat")}</h1>
				</div>
			</div>
			<div className="zt-card grow flex gap-6">
				<ChatHistory />
				<Chat />
			</div>
		</section>
	)
}