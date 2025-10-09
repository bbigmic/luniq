'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Upload, X, Image as ImageIcon, Loader2, Plus } from 'lucide-react';
import { toast } from 'react-hot-toast';

interface ImageUploadProps {
  images: string[];
  onImagesChange: (images: string[]) => void;
  maxImages?: number;
}

export function ImageUpload({ images, onImagesChange, maxImages = 5 }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    if (images.length + files.length > maxImages) {
      toast.error(`You can only upload up to ${maxImages} images`);
      return;
    }

    setUploading(true);

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file type
        if (!file.type.startsWith('image/')) {
          throw new Error(`${file.name} is not an image file`);
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          throw new Error(`${file.name} is too large. Maximum size is 5MB`);
        }

        // Convert to base64 for storage
        return new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      });

      const uploadedImages = await Promise.all(uploadPromises);
      onImagesChange([...images, ...uploadedImages]);
      toast.success(`${uploadedImages.length} image(s) uploaded successfully`);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    onImagesChange(newImages);
  };

  const handleManualAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    if (url && images.length < maxImages) {
      onImagesChange([...images, url]);
      e.target.value = ''; // Clear input
    } else if (images.length >= maxImages) {
      toast.error(`You can only add up to ${maxImages} images`);
    }
  };

  return (
    <div className="space-y-4">
      {/* Existing Images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div key={index} className="relative group aspect-square rounded-md overflow-hidden border">
              <img src={image} alt={`Product image ${index + 1}`} className="w-full h-full object-cover" />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => handleRemoveImage(index)}
              >
                <X className="h-3 w-3" />
              </Button>
              {index === 0 && (
                <div className="absolute bottom-1 left-1 bg-primary/80 text-primary-foreground text-xs px-2 py-1 rounded">
                  Main
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* File Upload */}
      {images.length < maxImages && (
        <div className="border-2 border-dashed border-muted-foreground/20 rounded-lg p-6">
          <div className="text-center space-y-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <div>
              <Label htmlFor="file-upload" className="cursor-pointer">
                <span className="text-sm font-medium text-primary hover:text-primary/80">
                  Click to upload images
                </span>
                <span className="text-xs text-muted-foreground block mt-1">
                  PNG, JPG, GIF up to 5MB each
                </span>
              </Label>
              <Input
                ref={fileInputRef}
                id="file-upload"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={(e) => handleFileUpload(e.target.files)}
              />
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => fileInputRef.current?.click()}
              disabled={uploading}
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Plus className="mr-2 h-4 w-4" />
                  Select Images
                </>
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Manual URL Input */}
      {images.length < maxImages && (
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Or add image URL</Label>
          <div className="flex gap-2">
            <Input
              id="imageUrl"
              placeholder="https://example.com/image.jpg"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleManualAdd(e.target as HTMLInputElement);
                }
              }}
            />
            <Button type="button" onClick={() => {
              const input = document.getElementById('imageUrl') as HTMLInputElement;
              if (input) {
                handleManualAdd(input);
              }
            }}>
              Add URL
            </Button>
          </div>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center text-muted-foreground py-8">
          <ImageIcon className="mx-auto h-8 w-8 mb-2" />
          <p>No images added yet.</p>
          <p className="text-sm">Upload images or add URLs to showcase your product.</p>
        </div>
      )}
    </div>
  );
}