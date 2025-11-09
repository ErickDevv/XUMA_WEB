#!/bin/bash

# Script para validar Open Graph tags en tu sitio web local
# Uso: ./validate-og.sh [URL]

URL="${1:-http://localhost:3000}"

echo "🔍 Validando Open Graph tags en: $URL"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Obtener el HTML
HTML=$(curl -s "$URL")

# Función para extraer meta tags
extract_meta() {
    local property=$1
    echo "$HTML" | grep -oP "(?<=<meta property=\"$property\" content=\")[^\"]*" | head -1
}

extract_meta_name() {
    local name=$1
    echo "$HTML" | grep -oP "(?<=<meta name=\"$name\" content=\")[^\"]*" | head -1
}

# Open Graph tags básicos
echo ""
echo "📊 Open Graph Tags:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

OG_TITLE=$(extract_meta "og:title")
OG_DESC=$(extract_meta "og:description")
OG_URL=$(extract_meta "og:url")
OG_TYPE=$(extract_meta "og:type")
OG_IMAGE=$(extract_meta "og:image")
OG_LOCALE=$(extract_meta "og:locale")
OG_SITE_NAME=$(extract_meta "og:site_name")

echo "✓ og:title: ${OG_TITLE:-❌ NO ENCONTRADO}"
echo "✓ og:description: ${OG_DESC:-❌ NO ENCONTRADO}"
echo "✓ og:url: ${OG_URL:-❌ NO ENCONTRADO}"
echo "✓ og:type: ${OG_TYPE:-❌ NO ENCONTRADO}"
echo "✓ og:image: ${OG_IMAGE:-❌ NO ENCONTRADO}"
echo "✓ og:locale: ${OG_LOCALE:-❌ NO ENCONTRADO}"
echo "✓ og:site_name: ${OG_SITE_NAME:-❌ NO ENCONTRADO}"

# Twitter Card tags
echo ""
echo "🐦 Twitter Card Tags:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

TW_CARD=$(extract_meta_name "twitter:card")
TW_TITLE=$(extract_meta_name "twitter:title")
TW_DESC=$(extract_meta_name "twitter:description")
TW_IMAGE=$(extract_meta_name "twitter:image")

echo "✓ twitter:card: ${TW_CARD:-❌ NO ENCONTRADO}"
echo "✓ twitter:title: ${TW_TITLE:-❌ NO ENCONTRADO}"
echo "✓ twitter:description: ${TW_DESC:-❌ NO ENCONTRADO}"
echo "✓ twitter:image: ${TW_IMAGE:-❌ NO ENCONTRADO}"

# Meta tags básicos
echo ""
echo "📝 Meta Tags Básicos:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

TITLE=$(echo "$HTML" | grep -oP "(?<=<title>)[^<]*" | head -1)
DESC=$(extract_meta_name "description")
KEYWORDS=$(extract_meta_name "keywords")
ROBOTS=$(extract_meta_name "robots")

echo "✓ title: ${TITLE:-❌ NO ENCONTRADO}"
echo "✓ description: ${DESC:-❌ NO ENCONTRADO}"
echo "✓ keywords: ${KEYWORDS:-❌ NO ENCONTRADO}"
echo "✓ robots: ${ROBOTS:-❌ NO ENCONTRADO}"

# Validación de imágenes
echo ""
echo "🖼️  Validación de Imágenes:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

if [ -n "$OG_IMAGE" ]; then
    if [[ $OG_IMAGE == http* ]]; then
        IMAGE_URL="$OG_IMAGE"
    else
        IMAGE_URL="${URL}${OG_IMAGE}"
    fi
    
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$IMAGE_URL")
    if [ "$STATUS" = "200" ]; then
        echo "✅ Imagen accesible: $IMAGE_URL"
        
        # Obtener dimensiones si está disponible
        if command -v identify &> /dev/null; then
            DIMS=$(curl -s "$IMAGE_URL" | identify -format "%wx%h" - 2>/dev/null)
            if [ -n "$DIMS" ]; then
                echo "📐 Dimensiones: $DIMS (Recomendado: 1200x630)"
            fi
        fi
    else
        echo "❌ Error: Imagen no accesible (HTTP $STATUS): $IMAGE_URL"
    fi
else
    echo "❌ No se encontró og:image"
fi

# Resumen
echo ""
echo "📋 Resumen:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

TOTAL=0
FOUND=0

for tag in "$OG_TITLE" "$OG_DESC" "$OG_URL" "$OG_TYPE" "$OG_IMAGE"; do
    TOTAL=$((TOTAL + 1))
    [ -n "$tag" ] && FOUND=$((FOUND + 1))
done

echo "✓ Tags Open Graph encontrados: $FOUND/$TOTAL"

TOTAL=0
FOUND=0

for tag in "$TW_CARD" "$TW_TITLE" "$TW_DESC" "$TW_IMAGE"; do
    TOTAL=$((TOTAL + 1))
    [ -n "$tag" ] && FOUND=$((FOUND + 1))
done

echo "✓ Tags Twitter Card encontrados: $FOUND/$TOTAL"

# Enlaces útiles
echo ""
echo "🔗 Validadores Online:"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Facebook: https://developers.facebook.com/tools/debug/"
echo "Twitter: https://cards-dev.twitter.com/validator"
echo "LinkedIn: https://www.linkedin.com/post-inspector/"
echo "Open Graph: https://www.opengraph.xyz/"

echo ""
echo "✅ Validación completada"
