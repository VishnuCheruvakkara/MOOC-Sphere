import os
import re
from pathlib import Path

ROOT = Path('.').resolve()

JS_EXTS = ['.js', '.jsx', '.ts', '.tsx', '.mjs', '.cjs']
PY_EXTS = ['.py']

IMPORT_RE = re.compile(r"from\s+['\"](\..*?)['\"]|require\(['\"](\..*?)['\"]\)|import\s+['\"](\..*?)['\"]")
PY_IMPORT_RE = re.compile(r"from\s+(\.+[\w\.]+)\s+import|import\s+(\.+[\w\.]+)")

def path_components_match(path: Path):
    # Verify each component matches exact case on filesystem
    parts = path.parts
    cur = Path(parts[0]) if path.is_absolute() else Path(parts[0])
    # If relative, start from first real component
    rel = Path(path)
    cur = Path('.')
    for p in rel.parts:
        try:
            entries = os.listdir(cur)
        except FileNotFoundError:
            return False, f"Path component '{p}' not found under {cur}"
        if p not in entries:
            # try case-insensitive match to see if mismatch
            lower_map = {e.lower(): e for e in entries}
            if p.lower() in lower_map:
                return False, f"Case mismatch: expected '{p}', actual '{lower_map[p.lower()]}' in {cur}"
            return False, f"Missing component '{p}' under {cur}"
        cur = cur / p
    return True, ''

def resolve_js_import(base: Path, imp: str):
    # base is file path
    base_dir = base.parent
    candidate = (base_dir / imp)
    # Try file with extensions
    for ext in JS_EXTS + ['']:
        p = candidate.with_suffix(ext) if ext else candidate
        if p.exists():
            return p
    # Try index files
    for ext in JS_EXTS:
        p = candidate / ('index' + ext)
        if p.exists():
            return p
    return None

def resolve_py_import(base: Path, imp: str):
    # imp like ..module.sub
    # Convert dots to path relative to base package
    levels = imp.count('.')
    rel = imp.lstrip('.')
    base_dir = base.parent
    for _ in range(levels - 1):
        base_dir = base_dir.parent
    if rel:
        rel_path = Path(rel.replace('.', '/'))
        candidate = base_dir / rel_path
    else:
        candidate = base_dir
    # check for package or module
    if candidate.with_suffix('.py').exists():
        return candidate.with_suffix('.py')
    if (candidate / '__init__.py').exists():
        return candidate / '__init__.py'
    return None

def scan_file(path: Path):
    issues = []
    text = path.read_text(encoding='utf-8')
    if path.suffix in JS_EXTS:
        for m in IMPORT_RE.finditer(text):
            imp = m.group(1) or m.group(2) or m.group(3)
            if not imp:
                continue
            target = resolve_js_import(path, imp)
            if not target:
                issues.append((str(path), imp, 'Not found'))
            else:
                ok, msg = path_components_match(Path(os.path.relpath(target)))
                if not ok:
                    issues.append((str(path), str(target), msg))
    elif path.suffix in PY_EXTS:
        for m in PY_IMPORT_RE.finditer(text):
            imp = m.group(1) or m.group(2)
            if not imp:
                continue
            target = resolve_py_import(path, imp)
            if not target:
                issues.append((str(path), imp, 'Not found'))
            else:
                ok, msg = path_components_match(Path(os.path.relpath(target)))
                if not ok:
                    issues.append((str(path), str(target), msg))
    return issues

def main():
    roots = ['frontend/src', 'backend']
    all_issues = []
    for r in roots:
        for dirpath, dirs, files in os.walk(r):
            for f in files:
                if any(f.endswith(ext) for ext in JS_EXTS + PY_EXTS):
                    p = Path(dirpath) / f
                    issues = scan_file(p)
                    all_issues.extend(issues)
    if not all_issues:
        print('No case-mismatch issues found for relative imports in scanned paths.')
    else:
        print('Found potential issues:')
        for it in all_issues:
            print('File:', it[0])
            print('  Import/Target:', it[1])
            print('  Issue:', it[2])
            print()

if __name__ == '__main__':
    main()
