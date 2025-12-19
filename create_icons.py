"""
カロリーチェッカー拡張機能用アイコン作成スクリプト
"""
from PIL import Image, ImageDraw, ImageFont
import os

def create_icon(size: int, output_path: str):
    """
    カロリーチェッカーのアイコンを生成する

    Args:
        size: アイコンサイズ（ピクセル）
        output_path: 出力ファイルパス
    """
    # 透明背景
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    # パステル水色の円形背景
    padding = size // 10
    draw.ellipse(
        [padding, padding, size - padding, size - padding],
        fill=(125, 211, 252, 255)  # #7DD3FC
    )

    # 中央に「C」を描画（Calorieの頭文字）
    font_size = int(size * 0.5)

    try:
        # システムフォントを試す
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        try:
            font = ImageFont.truetype("C:/Windows/Fonts/arial.ttf", font_size)
        except:
            # フォールバック
            font = ImageFont.load_default()

    text = "C"

    # テキストのバウンディングボックスを取得
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    # 中央に配置
    x = (size - text_width) // 2 - bbox[0]
    y = (size - text_height) // 2 - bbox[1]

    # 白い文字
    draw.text((x, y), text, fill=(255, 255, 255, 255), font=font)

    # 保存
    img.save(output_path, "PNG")
    print(f"アイコン作成: {output_path}")

def main():
    # 出力ディレクトリ
    output_dir = "extension/icons"
    os.makedirs(output_dir, exist_ok=True)

    # 各サイズを生成
    for size in [16, 32, 48, 128]:
        output_path = os.path.join(output_dir, f"icon{size}.png")
        create_icon(size, output_path)

    print("全アイコン作成完了")

if __name__ == "__main__":
    main()
