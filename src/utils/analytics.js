/**
 * Google Analytics 4 (GA4) & High-Intent Alert Engine
 * Property: CV François KINDA — CIDS & Dynamic Agro
 * Measurement ID: G-WBPRFJEFVJ
 * Notification Email: synaps.lab4dev@gmail.com
 */

export const GA_MEASUREMENT_ID = 'G-WBPRFJEFVJ';
const ALERT_EMAIL = 'synaps.lab4dev@gmail.com';
const NTFY_TOPIC = 'cv-francois-kinda-cids';

// Track sent alerts in memory to prevent spamming in a single session
const notifiedEvents = new Set();

/**
 * Safe wrapper around window.gtag
 */
export function sendGAEvent(eventName, params = {}) {
  try {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('event', eventName, {
        ...params,
        send_to: GA_MEASUREMENT_ID,
      });
    }
  } catch (err) {
    console.debug('[GA4] Event error:', err);
  }
}

/**
 * Option C: High-Intent Notification Dispatcher
 * Sends instant background email + ntfy push when a recruiter takes high-value actions.
 */
export function notifyHighIntent(actionType, details = {}) {
  try {
    const dedupeKey = `${actionType}_${JSON.stringify(details)}`;
    if (notifiedEvents.has(dedupeKey)) {
      return; // Already notified in this browser session
    }
    notifiedEvents.add(dedupeKey);

    const now = new Date();
    const timestamp = now.toLocaleString('fr-FR', { timeZone: 'Africa/Ouagadougou' }) + ' (GMT+0 Ouaga)';

    const payload = {
      _subject: `🔔 [CV CIDS/Dynamic Agro] Action Recruteur : ${actionType}`,
      _template: 'table',
      _captcha: 'false',
      Action: actionType,
      Details: typeof details === 'object' ? JSON.stringify(details, null, 2) : String(details),
      Date_Heure: timestamp,
      Referrer: typeof document !== 'undefined' ? (document.referrer || 'Accès direct / Lien direct') : 'N/A',
      Page_URL: typeof window !== 'undefined' ? window.location.href : 'N/A',
      Navigateur: typeof navigator !== 'undefined' ? navigator.userAgent : 'N/A',
    };

    // 1. Send email notification via FormSubmit AJAX endpoint (silent background request)
    fetch(`https://formsubmit.co/ajax/${ALERT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {
      // Silent catch: network failures should never disrupt user experience
    });

    // 2. Instant push notification via ntfy.sh (accessible via web link or ntfy app)
    fetch(`https://ntfy.sh/${NTFY_TOPIC}`, {
      method: 'POST',
      headers: {
        'Title': `Visite CV CIDS: ${actionType}`,
        'Priority': 'urgent',
        'Tags': 'briefcase,bell',
      },
      body: `Action: ${actionType}\nDétails: ${JSON.stringify(details)}\nHeure: ${timestamp}`,
      keepalive: true,
    }).catch(() => {
      // Silent catch
    });

  } catch (err) {
    console.debug('[Notify] Alert error:', err);
  }
}

/**
 * 1. Track Section / Category navigation
 */
export function trackCategoryChange(categoryName) {
  sendGAEvent('select_category', {
    category_name: categoryName,
    event_category: 'navigation',
  });
}

/**
 * 2. Track Flashcard Open
 */
export function trackCardOpen(card) {
  if (!card) return;
  sendGAEvent('open_card', {
    card_id: card.id,
    card_title: card.title,
    card_category: card.category,
    event_category: 'engagement',
  });
}

/**
 * 3. Track Flashcard Reading Time
 */
export function trackCardClose(card, durationSeconds) {
  if (!card || durationSeconds <= 1) return;

  sendGAEvent('read_card_duration', {
    card_id: card.id,
    card_title: card.title,
    card_category: card.category,
    duration_seconds: durationSeconds,
    value: durationSeconds,
    event_category: 'reading_time',
  });

  // Flag high interest if recruiter spends >= 25 seconds reading
  if (durationSeconds >= 25) {
    sendGAEvent('high_intent_reading', {
      card_id: card.id,
      card_title: card.title,
      duration_seconds: durationSeconds,
      event_category: 'high_intent',
    });

    // Option C alert for deep reading
    notifyHighIntent('Lecture approfondie de fiche', {
      fiche: card.title,
      categorie: card.category,
      temps_secondes: `${durationSeconds} secondes`,
    });
  }
}

/**
 * 4. Track Contact Clicks (WhatsApp, Email, Phone, LinkedIn)
 */
export function trackContactClick(method, location = 'hero') {
  sendGAEvent('generate_lead', {
    contact_method: method,
    button_location: location,
    event_category: 'conversion',
  });

  // Option C alert for contact click
  notifyHighIntent(`Prise de contact (${method.toUpperCase()})`, {
    methode: method,
    emplacement: location,
  });
}

/**
 * 5. Track Portfolio (PDF) clicks
 */
export function trackPortfolioClick() {
  sendGAEvent('view_portfolio', {
    content_type: 'pdf_realisations',
    event_category: 'conversion',
  });

  // Option C alert for portfolio exploration
  notifyHighIntent('Consultation Portfolio Réalisations', {
    action: 'Clic sur le lien Portfolio PDF / Réalisations',
  });
}

/**
 * 6. Track Profile Share
 */
export function trackShareClick() {
  sendGAEvent('share', {
    method: 'system_or_clipboard',
    content_type: 'cv_link',
  });
}

/**
 * Track Demo Platform clicks
 */
export function trackDemoClick() {
  sendGAEvent('view_demo_platform', {
    content_type: 'crm_demo_link',
    event_category: 'conversion',
  });

  notifyHighIntent('Consultation Plateforme Démo', {
    action: 'Clic sur le lien de démonstration Dynamic Agro',
  });
}

/**
 * 7. Track View Mode Switcher ('flashcards' vs 'full')
 */
export function trackViewModeChange(mode) {
  sendGAEvent('switch_view_mode', {
    view_mode: mode,
    event_category: 'ux_preference',
  });
}

/**
 * 8. Track Dark / Light theme toggle
 */
export function trackThemeChange(theme) {
  sendGAEvent('toggle_theme', {
    theme: theme,
    event_category: 'ux_preference',
  });
}
