import { useState } from "react";

import type { FolderNode, RequestNode } from "../../types";
import RequestSidebar from "./RequestSidebars";
import { TabList, Tab } from "./TabLayout";

import { project } from "../../../test/test_data";

export type TabNode = FolderNode | RequestNode;

export default function Home() {
  const [tabs, setTabs] = useState<TabNode[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>();

  const openRequestTab = (requestId: string) => {
    const request: FolderNode | RequestNode | null = findNodeById(
      requestId,
      project.rootFolder
    );

    if (!request) return;

    /// check if this request is already open as a tab
    if (tabs.find((tab) => tab.id === request.id)) {
      setActiveTabId(requestId);
      return;
    }

    /// create tab with this request
    setTabs([...tabs, request]);
    setActiveTabId(request.id);
  };

  const changeTab = (tabId: string) => {
    setActiveTabId(tabId);
  };
  const closeTab = (tabId: string) => {
    if (tabId === activeTabId) setActiveTabId(tabs[0].id);

    setTabs(tabs.filter((request) => request.id !== tabId));
  };

  const addNewTab = () => {
    console.log("add empty request tab");
  };

  const findNodeById = (
    id: string,
    node: FolderNode | RequestNode
  ): FolderNode | RequestNode | null => {
    if (node.id === id) return node;

    if (node.type == "folder" && node.children) {
      for (const child of node.children) {
        const result: FolderNode | RequestNode | null = findNodeById(id, child);
        if (result) return result;
      }
    }

    return null;
  };

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <RequestSidebar
          folderTree={project.rootFolder}
          onFolderSelected={console.log}
          onRequestSelected={openRequestTab}
        />
      </div>
      <div className="flex-9">
        <TabList addNewTab={addNewTab}>
          {tabs.map((tab) => (
            <Tab
              tabNode={tab}
              key={tab.id}
              isActive={tab.id === activeTabId}
              onChangeTab={changeTab}
              onCloseTab={closeTab}
            />
          ))}
        </TabList>

        <div className="flex-1 p-4 overflow-auto bg-gray-50">
          <div className="border border-dashed border-gray-400 rounded p-4 h-full">
            <h2 className="text-lg font-semibold text-gray-700">Content</h2>
            <p className="text-sm text-gray-500 mt-2">
              Placeholder content for
            </p>
            <p>active tab id is {activeTabId}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
