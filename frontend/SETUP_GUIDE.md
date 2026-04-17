# 🛫 Karmana Flight Booking Website - Complete Setup Guide

## Project Overview
Karmana is a modern, responsive flight booking website with a stunning UI built using Bootstrap, Font Awesome icons, and AOS (Animate On Scroll) animations.

---

## 📦 External Libraries Used

### 1. **Bootstrap 5.3.0**
- Latest Bootstrap framework for responsive grid layout
- Pre-built components and utilities
- CDN: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`
- JS: `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js`

### 2. **Font Awesome 6.4.0**
- Comprehensive icon library with 7,000+ icons
- CDN: `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`
- Used for: Navigation icons, deal badges, step indicators, testimonial ratings

### 3. **AOS (Animate On Scroll) 2.3.4**
- Lightweight scroll animation library
- CSS: `https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.css`
- JS: `https://cdnjs.cloudflare.com/ajax/libs/aos/2.3.4/aos.js`
- Provides smooth fade-in, zoom, and slide animations as elements come into view

---

## 🎨 Design Features

### Color Scheme
```css
--primary-color: #6366f1 (Indigo)
--secondary-color: #ff6600 (Orange)
--accent-color: #fbbf24 (Amber)
--dark-bg: #1f2937 (Dark Gray)
--light-bg: #f9fafb (Light Gray)
```

### Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Main Headings**: 800 font-weight
- **Smooth Scrolling**: Enabled globally via CSS

---

## 📁 File Structure

```
Test folder/
├── index.html                 # Main page with all sections
├── header.html               # Navigation header component
├── footer.html               # Footer component with links
├── style.css                 # Complete styling (comprehensive)
├── script.js                 # JavaScript functionality
├── Flight.css                # Flight-specific styles (optional)
├── Flightbooking.html        # Flight booking page
├── Hotel booking.html        # Hotel booking page
├── Holiday Packages.html     # Holiday packages page
├── services.html             # Services page
├── About.html                # About page
├── Contact.html              # Contact page
└── SETUP_GUIDE.md           # This file
```

---

## 🚀 Key Sections

### 1. **Hero Section**
- **Parallax Background**: Scrolling effect on background image
- **Search Form**: Multi-field flight search (from, to, dates, passengers, class)
- **CTA Button**: Prominent "Search Flights" button
- **Animations**: Fade-up animations for title and subtitle

**Features:**
- Fixed background attachment for parallax effect
- Responsive grid layout for form inputs
- Mobile-optimized for touch targets
- Date validation (minimum date = today)

### 2. **Featured Offers Section**
- **Offer Cards**: Displaying flight deals with:
  - Airline/Route icon
  - Discount badge (% saved)
  - Original and discounted prices
  - Call-to-action button
- **Hover Effects**: Card elevation and smooth transitions
- **AOS Animation**: Cards fade in as user scrolls

### 3. **How It Works Section**
- **Step Cards**: 4-step process visualization
  1. Search Flights
  2. Filter & Compare
  3. Secure Payment
  4. Ready to Fly
- **Icon Indicators**: Large circular icons for each step
- **Hover Scaling**: Icons scale up on card hover

### 4. **Popular Destinations Section**
- **Destination Cards**: Image overlay with destination info
  - Background image with dark overlay
  - Destination name and starting price
  - "Explore" button
- **Hover Effects**: Image zoom and overlay darkening
- **Multiple Destinations**: 6 featured locations from around world

### 5. **Testimonials Section**
- **Review Cards**: Customer feedback with:
  - 5-star rating display
  - Review text
  - Customer name and location
  - Avatar image
- **Grid Layout**: Responsive 3-column layout (mobile: 1-column)
- **Hover Effects**: Card elevation on hover

### 6. **Newsletter Section**
- **Email Subscription**: Email input with validation
- **CTA Button**: Subscribe button with icon
- **Gradient Background**: Eye-catching purple gradient
- **Email Validation**: Real-time email format checking
- **Success Message**: Notification on subscription

### 7. **Footer Section**
- **Company Info**: Karmana description + social icons
- **Quick Links**: Navigation links
- **Services Links**: Flight, Hotel, Holiday packages
- **Contact Info**: Email, phone, location
- **Social Media**: Links to Facebook, Twitter, Instagram, LinkedIn
- **Copyright**: Legal information and footer links

---

## 🎯 Interactive Features

### Parallax Scrolling
```javascript
// Implemented in script.js
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    parallaxBg.style.backgroundPosition = `center ${scrollPosition * 0.5}px`;
});
```

### AOS Animations
```html
<!-- Add data-aos attributes to elements -->
<div data-aos="fade-up" data-aos-delay="100" data-aos-duration="1000">
    Content here
</div>
```

**AOS Options:**
- `duration`: Animation duration (default: 800ms)
- `delay`: Animation delay before starting
- `offset`: Trigger point before element enters viewport (default: 120px)
- `once`: Execute animation only once (default: false)
- `mirror`: Re-trigger on scroll back up (default: true)

### Mobile Menu Toggle
- Hamburger icon visible on tablets (max-width: 768px)
- Full menu on desktop
- Click-outside-to-close functionality
- Smooth animations

### Form Validation
- **Date Inputs**: Minimum date set to today
- **Email Validation**: Regex pattern check
- **Required Fields**: All form fields required
- **Notifications**: User-friendly feedback messages

### Notification System
```javascript
showNotification('Message text', 'success|warning|error|info');
```

**Types:**
- `success`: Green background (✓)
- `warning`: Orange background (⚠)
- `error`: Red background (✗)
- `info`: Blue background (ⓘ)

---

## 📱 Responsive Breakpoints

### Desktop (> 992px)
- Full navigation menu
- 3+ column layouts
- Full-size images and cards
- Parallax effects enabled

### Tablet (768px - 992px)
- Hamburger menu
- 2-column layouts
- Optimized spacing
- Touch-friendly buttons

### Mobile (< 768px)
- Single column layouts
- Hamburger navigation
- Optimized font sizes (16px inputs for iOS)
- Smaller margins/padding
- Touch-optimized interactive elements

---

## 🎨 Animation Triggers

### On Page Load
- Hero title and subtitle fade in
- Search form slides up
- All sections fade in when scrolled into view

### On Hover
- Card elevation (translateY)
- Icon scaling
- Color transitions
- Link underline animations

### On Scroll
- Parallax background movement
- AOS element animations
- Fade-in effects on cards
- Zoom effects on destination images

---

## 🔧 Customization Guide

### Change Brand Colors
Edit `:root` variables in `style.css`:
```css
:root {
    --primary-color: #6366f1;        /* Change here */
    --secondary-color: #ff6600;      /* Change here */
    --accent-color: #fbbf24;         /* Change here */
}
```

### Modify Hero Image
Edit in `index.html`:
```html
<div class="parallax-bg" style="background-image: url('YOUR_IMAGE_URL');">
</div>
```

### Add More Destinations
Add new destination card in `index.html`:
```html
<div class="col-12 col-md-6 col-lg-4" data-aos="zoom-up">
    <div class="destination-card">
        <div class="destination-image" style="background-image: url('IMAGE_URL');">
            <div class="overlay"></div>
            <div class="destination-info">
                <h3>City Name</h3>
                <p><i class="fas fa-plane"></i> From $XXX</p>
                <button class="btn btn-sm btn-light">Explore</button>
            </div>
        </div>
    </div>
</div>
```

### Adjust Animation Speed
Edit in `script.js` - AOS configuration:
```javascript
AOS.init({
    duration: 800,  // Change timing here (ms)
    offset: 120     // Change trigger point
});
```

---

## 🔗 Integration Notes

### External APIs (Future Implementation)
- **Flight Search API**: Connect to actual flight booking service
- **Payment Gateway**: Integrate Stripe/PayPal
- **Email Service**: Add SendGrid for newsletters
- **Analytics**: Add Google Analytics tracking

### Local Testing
Open `index.html` with Live Server (VS Code) or similar:
```bash
# Using Python
python -m http.server 5500

# Using Node http-server
npx http-server
```

---

## 📋 Browser Compatibility

- ✅ Chrome/Edge (Latest)
- ✅ Firefox (Latest)
- ✅ Safari (Latest)
- ✅ Mobile Browsers (iOS Safari, Chrome Mobile)
- ✅ Internet Explorer 11+ (with polyfills)

---

## 🎯 Best Practices Implemented

1. **Mobile-First Approach**: Designed for mobile, enhanced for larger screens
2. **Accessibility**: ARIA labels, semantic HTML, keyboard navigation
3. **Performance**: 
   - Lazy loading for images
   - CSS animations (GPU accelerated)
   - Minimized JavaScript
4. **SEO**: Meta tags, structured HTML, descriptive alt text
5. **UX**: Smooth animations, clear CTAs, intuitive navigation

---

## 📸 Feature Highlights

✨ **Modern Design**: Gradient backgrounds, smooth transitions, shadow effects
⚡ **Fast Loading**: Optimized images, CDN resources
📱 **Fully Responsive**: Works on all devices
🎭 **Rich Animations**: Scroll animations, parallax effects, hover states
🎨 **Beautiful UI**: Color harmony, consistent spacing, professional typography
🔍 **User-Friendly**: Clear CTAs, intuitive navigation, helpful notifications

---

## 🚀 Deployment

### Build Optimization
1. Minify CSS and JavaScript
2. Optimize images
3. Enable GZIP compression
4. Use CDN for assets

### Hosting Recommendations
- **Static Hosting**: Netlify, Vercel, GitHub Pages
- **Full Stack**: Heroku, DigitalOcean, AWS

### Environment Setup
```bash
# For local development
npm install -g http-server
http-server -p 5500
```

---

## 📞 Support & Contact

For questions about customization:
1. Check the inline comments in CSS and JS files
2. Review Bootstrap documentation
3. Check AOS documentation for animation options
4. Consult Font Awesome icon library

---

## 📄 License

This template is provided as-is for educational and commercial use.

---

**Version**: 1.0.0
**Last Updated**: April 2026
**Created for**: Karmana Flight Booking Platform

---

## 🎉 End-to-End Feature Checklist

- ✅ Hero section with parallax
- ✅ Flight search form
- ✅ Featured deals section
- ✅ How it works guide
- ✅ Popular destinations
- ✅ Testimonials carousel
- ✅ Newsletter subscription
- ✅ Responsive footer
- ✅ Mobile navigation
- ✅ Form validation
- ✅ Notification system
- ✅ Smooth scrolling
- ✅ AOS animations
- ✅ Font Awesome icons
- ✅ Bootstrap grid
- ✅ Modern UI/UX
- ✅ Accessible design
- ✅ Cross-browser support

