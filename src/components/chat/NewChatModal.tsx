// src/components/chat/NewChatModal.tsx

"use client";

import { useState, useEffect } from "react";
import { useChat } from "./ChatContext";
import { User } from "@/models/chat.model";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// Asumsikan Anda memiliki komponen Modal atau Dialog
// import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"; 
// Ganti dengan komponen UI Anda yang sesuai.

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

  // Ambil daftar pengguna saat modal dibuka atau search term berubah
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

  const handleCreateRoom = async (targetUserId: string) => {
    if (isCreating || !currentUser) return;

    setIsCreating(true);
    // Payload untuk chat 1-vs-1: [ID pengguna saat ini, ID pengguna target]
    const userIds = [currentUser.id, targetUserId];

    // Panggil aksi dari ChatContext
    const newRoomId = await createRoomChat(userIds); 

    if (newRoomId) {
      // 1. Arahkan pengguna ke room chat yang baru dibuat
      router.push(`/chat/${newRoomId}`);

      // 2. Tutup modal
      onClose();
    } else {
      // Error ditangani di ChatContext, cukup log atau tampilkan notifikasi jika perlu
      console.error("Gagal membuat room chat baru:", error);
    }
    setIsCreating(false);
  };

  if (!isOpen) return null; // Ganti dengan komponen Modal/Dialog UI Anda

  // *Ganti div ini dengan komponen Modal/Dialog UI Anda*
  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <h2 className="text-xl font-bold mb-4">Buat Chat Baru 💬</h2>
        <Input
          type="text"
          placeholder="Cari pengguna..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4"
          disabled={loading || isCreating}
        />
        {error && <p className="text-red-500 mb-4">{error}</p>}
        
        <div className="max-h-80 overflow-y-auto space-y-2">
          {loading && availableUsers.length === 0 ? (
            <p className="text-gray-500">Memuat pengguna...</p>
          ) : availableUsers.length === 0 && !searchTerm ? (
            <p className="text-gray-500">Tidak ada pengguna yang tersedia.</p>
          ) : availableUsers.length === 0 && searchTerm ? (
            <p className="text-gray-500">Tidak ada hasil untuk "{searchTerm}".</p>
          ) : (
            availableUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  {user.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{user.name}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                <Button
                  onClick={() => handleCreateRoom(user.id)}
                  disabled={isCreating}
                  size="sm"
                >
                  {isCreating ? "Membuat..." : "Chat"}
                </Button>
              </div>
            ))
          )}
        </div>
        
        <div className="flex justify-end mt-4">
          <Button variant="outline" onClick={onClose} disabled={isCreating}>
            Tutup
          </Button>
        </div>
      </div>
    </div>
  );
}