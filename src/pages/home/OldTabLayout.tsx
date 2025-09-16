import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export type Tab = {
  id: string;
  title: string;
  type: "request" | "folder" | "project";
};

export  function TabContext() {
  const [tabs, setTabs] = useState<Tab[]>([
    { id: uuidv4(), title: "Tab 1", type: "request" },
  ]);

  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const addTab = () => {
    const newTab: Tab = {
      id: uuidv4(),
      title: `Tab ${tabs.length + 1}`,
      type: "request",
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
  };

  const closeTab = (id: string) => {
    const newTabs = tabs.filter((tab) => tab.id !== id);

    // If closed tab is active, switch to another
    if (id === activeTabId && newTabs.length > 0) {
      setActiveTabId(newTabs[0].id);
    }

    setTabs(newTabs);
  };

  const changeTab = (id: string) => {
    setActiveTabId(id);
  };

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Tab bar */}

      {/* Tab content */}
      <div className="flex-1 p-4 overflow-auto bg-gray-50">
        {activeTab ? (
          <div className="border border-dashed border-gray-400 rounded p-4 h-full">
            <h2 className="text-lg font-semibold text-gray-700">
              {activeTab.title} Content
            </h2>
            <p className="text-sm text-gray-500 mt-2">
              Placeholder content for {activeTab.title}.
            </p>
          </div>
        ) : (
          <div className="text-center text-gray-400 mt-10">No tabs open.</div>
        )}
      </div>
    </div>
  );
}

function TabList() {
  return (
    <div className="flex items-center bg-white border-b border-gray-300 px-2 py-2">
      {tabs.map((tab) => (
        
      ))}

      {/* Add tab button */}
      <button
        onClick={addTab}
        className="ml-2 px-3 py-1 rounded hover:bg-gray-200 text-gray-600"
      >
        +
      </button>
    </div>
  );
}

interface TabProps 

export function Tab({tab: Tab activeTabId: string}) {
  return <div
          key={tab.id}
          className={`flex items-center space-x-2 px-3 py-1 cursor-pointer ${
            tab.id === activeTabId
              ? "bg-blue-100 text-blue-700"
              : "hover:bg-gray-100 text-gray-600"
          }`}
          onClick={() => changeTab(tab.id)}
        >
          <span>{tab.title}</span>
          <button
            className="text-sm hover:text-red-500"
            onClick={(e) => {
              e.stopPropagation();
              closeTab(tab.id);
            }}
          >
            ×
          </button>
        </div>
}