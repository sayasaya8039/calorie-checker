"""
Chrome拡張機能のZIPファイル作成スクリプト
"""
import zipfile
import os

def create_extension_zip():
    """拡張機能フォルダをZIPに圧縮する"""
    extension_dir = "extension"
    zip_path = "calorie-checker-extension.zip"

    with zipfile.ZipFile(zip_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        for root, dirs, files in os.walk(extension_dir):
            for file in files:
                file_path = os.path.join(root, file)
                # ZIP内のパス（extension/を除去）
                arcname = os.path.relpath(file_path, extension_dir)
                zipf.write(file_path, arcname)
                print(f"追加: {arcname}")

    print(f"\nZIPファイル作成完了: {zip_path}")
    print(f"サイズ: {os.path.getsize(zip_path) / 1024:.1f} KB")

if __name__ == "__main__":
    create_extension_zip()
