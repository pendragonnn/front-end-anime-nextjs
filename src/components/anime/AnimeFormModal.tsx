"use client";

import { useState, useEffect, useRef } from "react";
import type { AnimeFormModalProps } from "@/models/anime.model";
import { GENRES } from "@/constant/constants";
import { uploadImageAction } from "@/services/media/media.service";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function AnimeFormModal({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}: AnimeFormModalProps) {
  const [title, setTitle] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [cover, setCover] = useState<string>(""); // Cover URL from server
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // File to upload
  const [previewUrl, setPreviewUrl] = useState<string>(""); // Local preview
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [genreCandidate, setGenreCandidate] = useState("");
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [error, setError] = useState("");

  // Prefill form saat edit
  useEffect(() => {
    if (!open) return;

    if (initialData) {
      setTitle(initialData.title);
      setSynopsis(initialData.synopsis || "");
      setCover(initialData.cover || "");
      setPreviewUrl(initialData.cover || "");
      setSelectedFile(null);
      setSelectedGenres(initialData.genres ?? []);
    } else {
      setTitle("");
      setSynopsis("");
      setCover("");
      setPreviewUrl("");
      setSelectedFile(null);
      setSelectedGenres([]);
    }

    setError("");
  }, [initialData, open]);

  const handleAddGenre = () => {
    if (!genreCandidate) return;
    if (!selectedGenres.includes(genreCandidate)) {
      setSelectedGenres((prev) => [...prev, genreCandidate]);
    }
    setGenreCandidate("");
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Ukuran gambar maksimal 5MB");
      return;
    }

    // Store file and create preview
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setError("");
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewUrl("");
    setCover("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !synopsis.trim()) {
      setError("Harap isi semua field.");
      return;
    }

    if (selectedGenres.length === 0) {
      setError("Minimal pilih 1 genre.");
      return;
    }

    // Upload image first if selected
    let coverUrl = cover;
    if (selectedFile) {
      try {
        setUploading(true);
        setError("");
        const result = await uploadImageAction(selectedFile);

        if (result.success && result.data) {
          coverUrl = result.data.url;
        } else {
          setError(result.error || "Gagal mengupload gambar");
          setUploading(false);
          return;
        }
      } catch (err) {
        setError("Gagal mengupload gambar");
        setUploading(false);
        return;
      } finally {
        setUploading(false);
      }
    }

    const payload = {
      title,
      synopsis,
      cover: coverUrl || undefined,
      genres: selectedGenres,
    };

    onSubmit(payload);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-black/90 backdrop-blur-xl border border-white/10 text-white max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold tracking-wide text-blue-400">
            {mode === "create" ? "Tambah Anime" : "Edit Anime"}
          </DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-300 p-2 rounded-md text-sm mb-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-2">
          {/* Judul */}
          <div>
            <label className="text-sm mb-1 block">Judul Anime</label>
            <Input
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="Masukkan judul anime"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Sinopsis */}
          <div>
            <label className="text-sm mb-1 block">Sinopsis</label>
            <Textarea
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              placeholder="Tuliskan sinopsis anime"
              rows={4}
              value={synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
            />
          </div>

          {/* Cover Image Upload */}
          <div>
            <label className="text-sm mb-1 block">Cover Image (Opsional)</label>
            <div className="flex flex-col gap-2">
              <div className="flex gap-2">
                <Input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  disabled={uploading}
                  className="bg-white/10 border-white/20 text-white file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
                {previewUrl && (
                  <Button
                    type="button"
                    variant="outline"
                    className="border-white/30 text-white"
                    onClick={handleRemoveImage}
                  >
                    Hapus
                  </Button>
                )}
              </div>
              {previewUrl && (
                <div className="relative w-full h-32 rounded-lg overflow-hidden border border-white/20">
                  <img
                    src={previewUrl}
                    alt="Cover preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Genre Picker */}
          <div className="flex flex-col gap-2">
            <label className="text-sm">Pilih Genre</label>

            <div className="flex gap-2">
              <Select value={genreCandidate} onValueChange={setGenreCandidate}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white">
                  <SelectValue placeholder="Pilih genre" />
                </SelectTrigger>
                <SelectContent className="bg-black/90 text-white border-white/10">
                  {GENRES.map((g) => (
                    <SelectItem key={g} value={g} className="text-white">
                      {g}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Button
                type="button"
                onClick={handleAddGenre}
                className="bg-blue-600 hover:bg-blue-700"
              >
                Tambah
              </Button>
            </div>

            {/* Selected Genres */}
            <div className="flex flex-wrap gap-2 mt-1">
              {selectedGenres.map((g) => (
                <div
                  key={g}
                  className="flex items-center gap-2 bg-blue-600/30 border border-blue-600 text-blue-300 px-3 py-1 rounded-full"
                >
                  <span className="text-sm">{g}</span>

                  <button
                    type="button"
                    onClick={() =>
                      setSelectedGenres((prev) => prev.filter((x) => x !== g))
                    }
                    className="text-blue-300 hover:text-red-400 transition"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <DialogFooter className="mt-4 flex justify-end gap-3">
            <Button
              variant="outline"
              className="border-white/30 text-white"
              type="button"
              onClick={onClose}
            >
              Batal
            </Button>

            <Button
              className="bg-blue-600 hover:bg-blue-700"
              type="submit"
              disabled={uploading}
            >
              {uploading ? "Mengupload..." : mode === "create" ? "Tambah" : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
