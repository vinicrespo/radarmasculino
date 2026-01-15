import os
from PIL import Image

def optimize_image(filepath, output_path=None, max_width=None):
    try:
        if not os.path.exists(filepath):
            print(f"File not found: {filepath}")
            return

        img = Image.open(filepath)
        print(f"Processing {filepath}: {img.format}, {img.size}")

        if max_width and img.width > max_width:
            ratio = max_width / img.width
            new_height = int(img.height * ratio)
            img = img.resize((max_width, new_height), Image.Resampling.LANCZOS)
            print(f"Resized to {img.size}")

        if output_path:
            save_path = output_path
        else:
            filename, ext = os.path.splitext(filepath)
            save_path = f"{filename}.webp"
        
        img.save(save_path, "WEBP", quality=80, optimize=True)
        print(f"Saved to {save_path}, size: {os.path.getsize(save_path)} bytes")

    except Exception as e:
        print(f"Error processing {filepath}: {e}")

# Optimize Cover
optimize_image("public/radar_masculino_cover.png", max_width=1920)

# Optimize Logo (favicon usage mostly, so resize to smaller)
# Using 192px as a safe bet for high dpi
optimize_image("public/radar_masculino_logo.png", max_width=192)
