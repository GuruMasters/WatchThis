#!/bin/bash

# ==========================================
# Image Optimization Script
# Converts images to WebP and generates responsive sizes
# ==========================================

set -e

echo "🖼️  WatchThis - Image Optimization"
echo "==================================="

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check if required tools are installed
if ! command -v convert &> /dev/null; then
    echo -e "${RED}❌ ImageMagick is not installed${NC}"
    echo "Install it with:"
    echo "  macOS: brew install imagemagick"
    echo "  Ubuntu: sudo apt-get install imagemagick"
    exit 1
fi

if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}⚠️  cwebp is not installed (optional for better WebP conversion)${NC}"
    echo "Install it with:"
    echo "  macOS: brew install webp"
    echo "  Ubuntu: sudo apt-get install webp"
    echo ""
fi

# Directories
INPUT_DIR="${1:-consultation-booking/consultation-frontend/public/watchthis}"
OUTPUT_DIR="${2:-consultation-booking/consultation-frontend/public/optimized}"

if [ ! -d "$INPUT_DIR" ]; then
    echo -e "${RED}❌ Input directory not found: $INPUT_DIR${NC}"
    exit 1
fi

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Responsive sizes
SIZES=(320 640 1024 1920)

# Function to optimize image
optimize_image() {
    local input="$1"
    local filename=$(basename "$input")
    local name="${filename%.*}"
    
    echo -e "${GREEN}📸 Processing: $filename${NC}"
    
    # Generate responsive sizes
    for size in "${SIZES[@]}"; do
        local output_jpg="$OUTPUT_DIR/${name}-${size}w.jpg"
        local output_webp="$OUTPUT_DIR/${name}-${size}w.webp"
        
        # Create JPEG version (optimized)
        convert "$input" \
            -resize "${size}x>" \
            -quality 85 \
            -strip \
            "$output_jpg"
        
        echo "  ✅ Created: ${name}-${size}w.jpg"
        
        # Create WebP version
        if command -v cwebp &> /dev/null; then
            cwebp -q 85 "$output_jpg" -o "$output_webp" 2>/dev/null
        else
            convert "$output_jpg" "$output_webp"
        fi
        
        echo "  ✅ Created: ${name}-${size}w.webp"
    done
    
    echo ""
}

# Process all images
total=0
for img in "$INPUT_DIR"/*.{jpg,jpeg,png,JPG,JPEG,PNG} 2>/dev/null; do
    if [ -f "$img" ]; then
        optimize_image "$img"
        ((total++))
    fi
done

if [ $total -eq 0 ]; then
    echo -e "${YELLOW}⚠️  No images found in $INPUT_DIR${NC}"
    exit 0
fi

echo -e "${GREEN}✅ Optimization complete!${NC}"
echo "Processed $total images"
echo "Output: $OUTPUT_DIR"
echo ""
echo "Generated files per image:"
for size in "${SIZES[@]}"; do
    echo "  - image-${size}w.jpg"
    echo "  - image-${size}w.webp"
done
echo ""
echo "Usage in code:"
echo '  <OptimizedImage basePath="/optimized/image-name" alt="Description" />'

