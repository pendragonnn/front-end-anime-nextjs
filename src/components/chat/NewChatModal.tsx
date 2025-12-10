// src/components/chat/NewChatModal.tsx

"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useChat } from "./ChatContext";
import { User } from "@/models/chat.model";
import { useRouter } from "next/navigation";

export default function NewChatModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const router = useRouter();
  const { currentUser, fetchUsers, createRoomChat, loading, error, clearError } = useChat();
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted (for SSR)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Fetch users when modal opens or search term changes
  useEffect(() => {
    if (isOpen) {
      const loadUsers = async () => {
        clearError();
        const users = await fetchUsers(searchTerm);
        const filteredUsers = users.filter((u) => u.id !== currentUser?.id);
        setAvailableUsers(filteredUsers);
      };
      loadUsers();
    }
  }, [isOpen, searchTerm, fetchUsers, currentUser?.id, clearError]);

  // Reset search when modal closes
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm("");
    }
  }, [isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleCreateRoom = async (targetUserId: string) => {
    if (isCreating || !currentUser) return;

    setIsCreating(true);
    const userIds = [currentUser.id, targetUserId];

    const newRoomId = await createRoomChat(userIds);

    if (newRoomId) {
      router.push(`/chat/${newRoomId}`);
      onClose();
    } else {
      console.error("Failed to create room chat:", error);
    }
    setIsCreating(false);
  };

  if (!isOpen || !mounted) return null;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full max-w-md bg-[#0d0f12] rounded-2xl border border-white/10 shadow-2xl shadow-black/50 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-gradient-to-r from-blue-600/10 to-purple-600/10 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="text-3xl">💬</div>
            <h2 className="text-xl font-bold text-white">Buat Chat Baru</h2>
          </div>
          <button
            onClick={onClose}
            disabled={isCreating}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition text-white disabled:opacity-50"
          >
            ✕
          </button>
        </div>

        {/* Search Input */}
        <div className="px-6 pt-5 pb-3 flex-shrink-0">
          <div className="relative">
            <input
              type="text"
              placeholder="Cari pengguna..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              disabled={loading || isCreating}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition disabled:opacity-50"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white transition"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mx-6 mb-3 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm flex-shrink-0">
            {error}
          </div>
        )}

        {/* User List - Scrollable */}
        <div className="px-6 pb-5 overflow-y-auto flex-1">
          {loading && availableUsers.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mb-3" />
              <p>Memuat pengguna...</p>
            </div>
          ) : availableUsers.length === 0 && !searchTerm ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <div className="text-4xl mb-3">👥</div>
              <p>Tidak ada pengguna yang tersedia.</p>
            </div>
          ) : availableUsers.length === 0 && searchTerm ? (
            <div className="flex flex-col items-center justify-center py-12 text-zinc-500">
              <div className="text-4xl mb-3">🔍</div>
              <p>Tidak ada hasil untuk "{searchTerm}".</p>
            </div>
          ) : (
            <div className="space-y-2">
              {availableUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition group"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Avatar */}
                    {user.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-11 h-11 rounded-full object-cover border border-white/10 shadow-md flex-shrink-0"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center text-white font-semibold shadow-md flex-shrink-0">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                    )}

                    {/* User Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white truncate">
                        {user.name}
                      </p>
                      <p className="text-sm text-zinc-400 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  {/* Chat Button */}
                  <button
                    onClick={() => handleCreateRoom(user.id)}
                    disabled={isCreating}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                  >
                    {isCreating ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Membuat...</span>
                      </>
                    ) : (
                      <>
                        <span>💬</span>
                        <span>Chat</span>
                      </>
                    )}
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-white/10 bg-[#111315] flex-shrink-0">
          <button
            onClick={onClose}
            disabled={isCreating}
            className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );

  // Render modal using Portal to document.body
  return createPortal(modalContent, document.body);
}