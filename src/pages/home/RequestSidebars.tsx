// Sidebar.tsx
import { useState } from "react";
import { Folder, File } from "lucide-react";

import type { FolderNode, RequestNode } from "../../types";

interface TreeNodeProps {
  node: FolderNode | RequestNode;
  onFolderSelected: (folderId: string) => void;
  onRequestSelected: (requestId: string) => void;
}

function TreeNode({
  node,
  onFolderSelected,
  onRequestSelected,
}: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleToggle = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div className="ml-1">
      {/* Folder Item */}
      {node.type === "folder" ? (
        <>
          <div
            className="flex items-center cursor-pointer space-x-2 p-2 hover:bg-gray-500"
            onClick={handleToggle}
            onDoubleClick={() => onFolderSelected(node.id)}
          >
            <Folder className="w-5 h-5" />
            <span className="select-none">{node.name}</span>
          </div>
          {/* Collapsible Children */}
          {isOpen && node.children && (
            <div className="ml-1 border-l-2">
              {node.children.map((childNode) => (
                <TreeNode
                  key={childNode.id}
                  node={childNode}
                  onFolderSelected={onFolderSelected}
                  onRequestSelected={onRequestSelected}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        // File Item
        <div
          className="flex items-center space-x-2 p-2 hover:bg-gray-500 cursor-pointer"
          onClick={() => onRequestSelected(node.id)}
        >
          <File className="w-5 h-5" />
          <span className="select-none">{node.name}</span>
        </div>
      )}
    </div>
  );
}

interface RequestSidebarProps {
  folderTree: FolderNode;
  onFolderSelected: (folderId: string) => void;
  onRequestSelected: (requestId: string) => void;
}

export default function RequestSidebar({
  folderTree,
  onFolderSelected,
  onRequestSelected,
}: RequestSidebarProps) {
  // example tree
  /* const treeData: Node[] = [
    {
      name: "Folder 1",
      type: "folder",
      children: [
        { name: "Request 1", type: "file" },
        {
          name: "Subfolder 1",
          type: "folder",
          children: [
            { name: "Request 2", type: "file" },
            { name: "Request 3", type: "file" },
            {
              name: "another folder",
              type: "folder",
              children: [
                {
                  name: "another one",
                  type: "folder",
                  children: [{ name: "x", type: "file" }],
                },
              ],
            },
          ],
        },
      ],
    },
    { name: "Request 4", type: "file" },
  ]; */

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-lg font-bold mb-4">API Requests</h2>
      <div>
        <TreeNode
          key={folderTree.id}
          node={folderTree}
          onFolderSelected={onFolderSelected}
          onRequestSelected={onRequestSelected}
        />
        {/* {treeData.map((node) => (
          <TreeNode key={node.name} node={node} />
        ))} */}
      </div>
    </div>
  );
}
