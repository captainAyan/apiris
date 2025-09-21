import { Folder as FolderIcon, File } from "lucide-react";

import type { Folder, Request } from "../../types";
import { produce } from "immer";

export type TreeNode = Folder | Request;

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
      {treeNode.type === "folder" ? (
        // Folder Item
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
          {treeNode.extra.isOpen && treeNode.children && (
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
  setRootFolder: (rootFolder: Folder) => void;
  onFolderSelected: (folderId: string) => void;
  onRequestSelected: (requestId: string) => void;
}

export default function RequestTree({
  rootFolder,
  setRootFolder,
  onFolderSelected,
  onRequestSelected,
}: RequestTreeProps) {
  const handleFolderCollapse = (nodeId: string) => {
    const updatedTree: TreeNode = updateNodeById(
      rootFolder,
      nodeId,
      (node: TreeNode) => {
        if (node.type === "folder") {
          return produce(node, (draftState) => {
            draftState.extra.isOpen = !draftState.extra.isOpen;
          });
        } else throw "requests cannot be collapsed";
      }
    );

    if (updatedTree.type === "folder") setRootFolder(updatedTree);
  };

  function updateNodeById(
    node: TreeNode,
    targetId: string,
    updater: (node: TreeNode) => TreeNode
  ): TreeNode {
    if (node.id === targetId) return updater(node);

    if (node.type === "folder" && node.children) {
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
          key={rootFolder.id}
          treeNode={rootFolder}
          onFolderCollapsed={handleFolderCollapse}
          onFolderSelected={onFolderSelected}
          onRequestSelected={onRequestSelected}
        />
      </div>
    </div>
  );
}
