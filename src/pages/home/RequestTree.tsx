import { useState } from "react";
import { Folder as FolderIcon, File } from "lucide-react";

import type { Folder, Request } from "../../types";

export type TreeNode = {
  id: string;
  name: string;
  isOpen: boolean;
  type: "folder" | "request";
  children?: Array<TreeNode>;
};

interface TreeNodeProps {
  treeNode: TreeNode;
  onFolderCollapsed: (folderId: string) => void;
  onFolderSelected: (folderId: string) => void;
  onRequestSelected: (requestId: string) => void;
}

function TreeNodeView({
  treeNode,
  onFolderCollapsed,
  onFolderSelected,
  onRequestSelected,
}: TreeNodeProps) {
  const handleToggle = () => {
    onFolderCollapsed(treeNode.id);
  };

  return (
    <div>
      {/* Folder Item */}
      {treeNode.type === "folder" ? (
        <>
          <div
            className="flex items-center cursor-pointer space-x-2 p-2 hover:bg-gray-500"
            onClick={handleToggle}
            onDoubleClick={() => onFolderSelected(treeNode.id)}
          >
            <FolderIcon className="w-5 h-5" />
            <span className="select-none">{treeNode.name}</span>
          </div>
          {/* Collapsible Children */}
          {treeNode.isOpen && treeNode.children && (
            <div className="ml-1 border-l border-gray-400">
              {treeNode.children.map((childTreeNode: TreeNode) => (
                <TreeNodeView
                  key={childTreeNode.id}
                  treeNode={childTreeNode}
                  onFolderCollapsed={onFolderCollapsed}
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
          onClick={() => onRequestSelected(treeNode.id)}
        >
          <File className="w-5 h-5" />
          <span className="select-none">{treeNode.name}</span>
        </div>
      )}
    </div>
  );
}

interface RequestTreeProps {
  rootFolder: Folder;
  onFolderSelected: (folderId: string) => void;
  onRequestSelected: (requestId: string) => void;
}

export default function RequestTree({
  rootFolder,
  onFolderSelected,
  onRequestSelected,
}: RequestTreeProps) {
  const generateNodeTree = (rootFolder: Folder) => {
    function x(node: Folder) {
      const data: TreeNode = {
        id: node.id,
        name: node.name,
        type: "folder",
        isOpen: false,
      };
      if (node.type === "folder" && node.children) {
        let children: Array<TreeNode> = [];
        for (const child of node.children) {
          if (child.type === "folder") {
            children = [...children, x(child)];
          } else {
            children = [
              ...children,
              { id: child.id, name: child.name, type: "request", isOpen: true },
            ];
          }
        }

        data.children = children;
      }

      return data;
    }

    const y = x(rootFolder);
    return y;
  };

  const [virtualNodeTree, setVirtualNodeTree] = useState(
    generateNodeTree(rootFolder)
  );

  const handleFolderCollapse = (nodeId: string) => {
    const updatedVirtualTree = updateNodeById(
      virtualNodeTree,
      nodeId,
      (node) => ({
        ...node,
        isOpen: !node.isOpen,
      })
    );

    setVirtualNodeTree(updatedVirtualTree);
  };

  function updateNodeById(
    node: TreeNode,
    targetId: string,
    updater: (node: TreeNode) => TreeNode
  ): TreeNode {
    if (node.id === targetId) {
      return updater(node);
    }

    if (node.children) {
      return {
        ...node,
        children: node.children.map((child) =>
          updateNodeById(child, targetId, updater)
        ),
      };
    }

    return node;
  }

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-lg font-bold mb-4">API Requests</h2>
      <div>
        <TreeNodeView
          key={virtualNodeTree.id}
          treeNode={virtualNodeTree}
          onFolderCollapsed={handleFolderCollapse}
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
