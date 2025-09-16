import type React from "react";

import type { FolderNode, RequestNode } from "../../types";

interface TabListProps {
  addNewTab: () => void;
}

export function TabList({
  children,
  addNewTab,
}: React.PropsWithChildren<TabListProps>) {
  return (
    <div className="flex items-center bg-white border-b border-gray-300">
      {children}

      {/* Add tab button */}
      <button
        onClick={addNewTab}
        className="m-2 px-3 py-1 rounded hover:bg-gray-200 text-gray-600"
      >
        +
      </button>
    </div>
  );
}

interface TabProps {
  tabNode: FolderNode | RequestNode;
  isActive: boolean;
  onChangeTab: (tabId: string) => void;
  onCloseTab: (tabId: string) => void;
}

export function Tab({ tabNode, isActive, onChangeTab, onCloseTab }: TabProps) {
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
