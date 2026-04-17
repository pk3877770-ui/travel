<?php
/**
 * Karmana SEO Management System (Admin)
 * This script manages the SEO metadata stored in public/seo-data.json
 */

$dataFile = '../public/seo-data.json';
$message = '';
$status = '';

// Load existing data
if (file_exists($dataFile)) {
    $seoData = json_decode(file_get_contents($dataFile), true);
} else {
    $seoData = [];
}

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $pageKey = $_POST['page_key'] ?? '/';
    $seoData[$pageKey] = [
        'title' => $_POST['title'] ?? '',
        'description' => $_POST['description'] ?? '',
        'keywords' => $_POST['keywords'] ?? '',
        'canonical' => $_POST['canonical'] ?? '',
        'og_url' => $_POST['og_url'] ?? '',
        'publisher' => $_POST['publisher'] ?? '',
        'robots' => $_POST['robots'] ?? 'index, follow'
    ];

    if (file_put_contents($dataFile, json_encode($seoData, JSON_PRETTY_PRINT))) {
        $message = "Metadata for <strong>$pageKey</strong> updated successfully!";
        $status = 'success';
    } else {
        $message = "Error: Could not write to $dataFile. Check file permissions.";
        $status = 'error';
    }
}

// Get the current page being edited
$currentPage = isset($_GET['edit']) ? $_GET['edit'] : '/';
$currentMetadata = isset($seoData[$currentPage]) ? $seoData[$currentPage] : [
    'title' => '',
    'description' => '',
    'keywords' => '',
    'canonical' => '',
    'og_url' => '',
    'publisher' => '',
    'robots' => 'index, follow'
];

?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Karmana | SEO Management</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;700;900&family=Inter:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        :root {
            --primary: #0f172a;
            --accent: #f59e0b;
            --accent-hover: #d97706;
            --bg: #020617;
            --card-bg: #0f172a;
            --border: rgba(255,255,255,0.08);
            --text: #f8fafc;
        }

        body {
            font-family: 'Inter', sans-serif;
            background-color: var(--bg);
            color: var(--text);
            margin: 0;
            padding: 0;
            display: flex;
            min-h-screen: 100vh;
        }

        /* Sidebar */
        .sidebar {
            width: 300px;
            background: var(--card-bg);
            border-right: 1px solid var(--border);
            padding: 40px 20px;
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        .sidebar h2 {
            font-family: 'Outfit', sans-serif;
            font-weight: 900;
            font-size: 24px;
            margin-bottom: 30px;
            color: var(--accent);
            letter-spacing: 1px;
        }

        .page-link {
            padding: 12px 20px;
            border-radius: 12px;
            color: var(--text);
            text-decoration: none;
            font-weight: 600;
            transition: all 0.3s ease;
            display: block;
            background: rgba(255,255,255,0.02);
            border: 1px solid transparent;
        }

        .page-link:hover {
            background: rgba(255,255,255,0.05);
            border-color: var(--border);
        }

        .page-link.active {
            background: var(--accent);
            color: var(--primary);
        }

        /* Main Content */
        .main-content {
            flex: 1;
            padding: 60px;
            max-width: 900px;
        }

        .header {
            margin-bottom: 40px;
        }

        .header h1 {
            font-family: 'Outfit', sans-serif;
            font-size: 40px;
            font-weight: 900;
            margin: 0;
        }

        .alert {
            padding: 20px;
            border-radius: 16px;
            margin-bottom: 40px;
            animation: slideIn 0.5s ease;
        }

        .alert-success { background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.2); color: #10b981; }
        .alert-error { background: rgba(239, 68, 68, 0.1); border: 1px solid rgba(239, 68, 68, 0.2); color: #ef4444; }

        @keyframes slideIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }

        form {
            display: grid;
            gap: 30px;
        }

        .form-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
        }

        label {
            font-weight: 700;
            font-size: 14px;
            color: #94a3b8;
            text-transform: uppercase;
            letter-spacing: 0.1em;
        }

        input, textarea, select {
            background: rgba(255,255,255,0.03);
            border: 1px solid var(--border);
            padding: 16px 20px;
            border-radius: 14px;
            color: white;
            font-size: 16px;
            font-family: inherit;
            transition: all 0.3s ease;
        }

        input:focus, textarea:focus {
            outline: none;
            border-color: var(--accent);
            background: rgba(255,255,255,0.05);
            box-shadow: 0 0 0 4px rgba(245, 158, 11, 0.1);
        }

        textarea {
            resize: vertical;
            min-height: 100px;
        }

        .btn-submit {
            background: var(--accent);
            color: var(--primary);
            border: none;
            padding: 20px;
            border-radius: 16px;
            font-weight: 900;
            font-size: 18px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-family: 'Outfit', sans-serif;
        }

        .btn-submit:hover {
            background: var(--accent-hover);
            transform: translateY(-2px);
            box-shadow: 0 10px 20px -5px rgba(217, 119, 6, 0.3);
        }

        .helper-text {
            font-size: 12px;
            color: #64748b;
        }

    </style>
</head>
<body>

    <div class="sidebar">
        <h2>KARMANA</h2>
        <?php foreach ($seoData as $path => $data): ?>
            <a href="?edit=<?php echo urlencode($path); ?>" class="page-link <?php echo $currentPage === $path ? 'active' : ''; ?>">
                <?php echo $path === '/' ? 'Home Page' : ucwords(str_replace(['-', '/'], [' ', ''], $path)); ?>
            </a>
        <?php endforeach; ?>
    </div>

    <div class="main-content">
        <div class="header">
            <h1>SEO Settings</h1>
            <p style="color: #64748b;">Editing metadata for: <strong><?php echo htmlspecialchars($currentPage); ?></strong></p>
        </div>

        <?php if ($message): ?>
            <div class="alert alert-<?php echo $status; ?>">
                <?php echo $message; ?>
            </div>
        <?php endif; ?>

        <form method="POST">
            <input type="hidden" name="page_key" value="<?php echo htmlspecialchars($currentPage); ?>">

            <div class="form-group">
                <label>Page Title</label>
                <input type="text" name="title" value="<?php echo htmlspecialchars($currentMetadata['title']); ?>" placeholder="Enter page title..." required>
                <span class="helper-text">Optimized length: 50-60 characters.</span>
            </div>

            <div class="form-group">
                <label>Meta Description</label>
                <textarea name="description" placeholder="Enter meta description..." required><?php echo htmlspecialchars($currentMetadata['description']); ?></textarea>
                <span class="helper-text">Optimized length: 150-160 characters.</span>
            </div>

            <div class="form-group">
                <label>Keywords</label>
                <input type="text" name="keywords" value="<?php echo htmlspecialchars($currentMetadata['keywords']); ?>" placeholder="keyword1, keyword2, ...">
                <span class="helper-text">Comma-separated values.</span>
            </div>

            <div class="form-group">
                <label>Canonical URL</label>
                <input type="url" name="canonical" value="<?php echo htmlspecialchars($currentMetadata['canonical'] ?? ''); ?>" placeholder="https://karmana.com/page-url">
                <span class="helper-text">Preferred version of this page for search engines.</span>
            </div>

            <div class="form-group">
                <label>OG URL (Open Graph)</label>
                <input type="url" name="og_url" value="<?php echo htmlspecialchars($currentMetadata['og_url'] ?? ''); ?>" placeholder="https://karmana.com/page-url">
                <span class="helper-text">The URL used for social sharing (Open Graph).</span>
            </div>

            <div class="form-group">
                <label>Publisher URL</label>
                <input type="url" name="publisher" value="<?php echo htmlspecialchars($currentMetadata['publisher'] ?? ''); ?>" placeholder="https://google.com/+YourBrand">
                <span class="helper-text">Link to your Google+ or brand profile.</span>
            </div>

            <div class="form-group">
                <label>Robots Tag</label>
                <input type="text" name="robots" value="<?php echo htmlspecialchars($currentMetadata['robots'] ?? 'index, follow'); ?>" placeholder="index, follow">
                <span class="helper-text">Directives for search crawlers (e.g., "index, follow" or "noindex, nofollow").</span>
            </div>

            <button type="submit" class="btn-submit">Save Metadata Changes</button>
        </form>
    </div>

</body>
</html>
