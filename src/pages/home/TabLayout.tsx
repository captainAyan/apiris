// import type { Folder, Request } from "../../types";

// export type FolderTabNode = {
//   id: string;
//   isDirty: false;
//   type: "folder";
//   data: Folder;
// };

// export type RequestTabNode = {
//   id: string;
//   isDirty: false;
//   type: "request";
//   data: Request;
// };

// export type TabNode = FolderTabNode | RequestTabNode;

export type TabNode = {
  id: string;
  name: string;
  isDirty: boolean;
  // data: Request | Folder;
};

interface TabListProps {
  onAddTab: (tab: TabNode) => void;
  tabs: TabNode[];
  onCloseTab: (tabId: string) => void;
  onChangeTab: (tabId: string) => void;
  activeTabId?: string;
}

export function TabList({
  tabs,
  onAddTab,
  onCloseTab,
  onChangeTab,
  activeTabId,
}: TabListProps) {
  const addNewTab = () => {
    // const newTab = {
    //   id: "new_empty_tab_" + Date.now(),
    //   name: "New Tab",
    //   type: "request",
    // } as TabNode;

    // onAddTab(newTab);
    console.log("add new tab");
  };

  return (
    <div className="flex items-center overflow-x-scroll bg-white border-b border-gray-300">
      {tabs.map((tabNode) => (
        <Tab
          tabNode={tabNode}
          key={tabNode.id}
          isActive={tabNode.id === activeTabId}
          onChangeTab={onChangeTab}
          onCloseTab={onCloseTab}
        />
      ))}

      {/* Add tab button */}
      <button
        onClick={addNewTab}
        className="p-4 hover:bg-gray-200 text-gray-600"
      >
        +
      </button>
    </div>
  );
}

interface TabProps {
  tabNode: TabNode;
  isActive: boolean;
  onChangeTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
}

function Tab({ tabNode, isActive, onChangeTab, onCloseTab }: TabProps) {
  return (
    <div
      className={`flex items-center space-x-2 p-4 cursor-pointer ${
        isActive
          ? "bg-blue-100 text-blue-700 border-b-2 border-blue-300"
          : "hover:bg-gray-100 text-gray-600 border-b-2 border-gray-100"
      }`}
      onClick={() => (!isActive ? onChangeTab(tabNode.id) : null)}
    >
      <span className="select-none">{tabNode.name}</span>
      <button
        className="text-sm hover:text-red-500"
        onClick={(e) => {
          e.stopPropagation();
          onCloseTab(tabNode.id);
        }}
      >
        ×
      </button>
    </div>
  );
}
