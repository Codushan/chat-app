import ChatContainer from "../components/ChatContainer";
import NoChatSelected from "../components/NoChatSelected";
import Sidebar from "../components/Sidebar";

import { useChatStore} from "../store/useChatStore";

export default function Home() {

  const { selectedUser, getMessages } = useChatStore();
  const isSelectedUser = selectedUser !== null;

  return (
    <div className="bg-base-200">
      <div className="flex items-center justify-center pt-1 px-2">
        <div className="bg-base-100 rounded-lg shadow-cl w-full h-[calc(100vh-4.5rem)]">
          <div className="flex h-full rounded-lg overflow-hidden">
            <Sidebar />
            {!isSelectedUser ? <NoChatSelected/> : <ChatContainer/>}
          </div>
        </div>
      </div>
    </div>
  );
}