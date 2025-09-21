import { useEffect, useState } from "react";

import type { Folder, Project, Request } from "../../types";
import type { TabNode } from "./TabLayout";
import RequestTree from "./RequestTree";
import { TabList } from "./TabLayout";

import { project as projectData } from "../../../test/test_data";
import {
  getFromLocalStorage,
  saveToLocalStorage,
} from "../../localStorageUtil";

export default function Home() {
  const [tabs, setTabs] = useState<TabNode[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>();

  const [project, setProject] = useState<Project>(
    // projectData
    getFromLocalStorage("test-project")
  );

  useEffect(() => {
    saveToLocalStorage("test-project", project);
  }, [project]);

  const setRootFolder = (updatedRootFolder: Folder) => {
    const updatedProject = {
      ...project,
      rootFolder: updatedRootFolder,
    };
    setProject(updatedProject);
  };

  const openRequestTab = (requestId: string) => {
    const node: Folder | Request | null = findNodeById(
      requestId,
      project.rootFolder
    );

    if (!node) return;

    if (tabs.find((tab) => tab.id === node.id)) {
      setActiveTabId(requestId);
      return;
    }

    const newTab: TabNode = {
      id: node.id,
      name: node.name,
      isDirty: false,
    };

    setTabs([...tabs, newTab]);
    setActiveTabId(node.id);
  };

  const changeTab = (tabId: string) => {
    setActiveTabId(tabId);
  };

  const closeTab = (tabId: string) => {
    const closedTabIndex = tabs.findIndex((tab) => tab.id === tabId);
    if (closedTabIndex === -1) return;

    let newActiveTabId = activeTabId;
    if (tabId === activeTabId) {
      const newTabs = tabs.filter((tab) => tab.id !== tabId);
      if (newTabs.length > 0) {
        newActiveTabId =
          newTabs[closedTabIndex > 0 ? closedTabIndex - 1 : 0].id;
      } else {
        newActiveTabId = undefined;
      }
    }

    setTabs(tabs.filter((request) => request.id !== tabId));
    setActiveTabId(newActiveTabId);
  };

  const findNodeById = (
    id: string,
    node: Folder | Request
  ): Folder | Request | null => {
    if (node.id === id) return node;

    if (node.type == "folder" && node.children) {
      for (const child of node.children) {
        const result: Folder | Request | null = findNodeById(id, child);
        if (result) return result;
      }
    }

    return null;
  };

  return (
    <div className="flex h-full">
      <div className="flex-1">
        <RequestTree
          rootFolder={project.rootFolder}
          setRootFolder={setRootFolder}
          onFolderSelected={console.log}
          onRequestSelected={openRequestTab}
        />
      </div>
      <div className="flex-9">
        <TabList
          tabs={tabs}
          activeTabId={activeTabId}
          onAddTab={(newTab) => {
            setTabs([...tabs, newTab]);
            setActiveTabId(newTab.id);
          }}
          onChangeTab={changeTab}
          onCloseTab={closeTab}
        />
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
