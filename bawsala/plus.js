/* بوصلة التخصص — إضافات سوق العمل والقبول (بيانات + عرض)
   يُحمَّل في صفحة الطالب (bawsala/index.html) وفي دليل الموجّه (bawsala/guide.html).
   لتحديث الأرقام سنويًا: عدّل كتلة DATA فقط، ثم غيّر updated و nextReview. */
(function () {
  'use strict';

  var DATA = {
    updated: '2026-11-18',          // تاريخ آخر تحديث للأرقام
    updatedLabel: 'نوفمبر 2026',
    nextReview: '2027-01-15',       // بعده يظهر للموجّه تنبيه بمراجعة الأرقام

    // المرصد الوطني للعمل — تقرير توظيف الخريجين في سوق العمل السعودي (إصدار 2025):
    // خريجو البكالوريوس السعوديون الذكور لعام 2023، وتوظيفهم حتى 2024، دون القطاع العسكري.
    // emp: نسبة المشتغلين، pay: متوسط أجر أول وظيفة (ريال)، wait: متوسط الانتظار (شهر)، n: عدد الخريجين
    fields: {
      eng:      { name: 'الهندسة والتصنيع والبناء', emp: 91, pay: 8500, wait: 6.5, n: 7467 },
      health:   { name: 'الصحة والرفاه', emp: 81, pay: 9400, wait: 7.3, n: 7894 },
      ict:      { name: 'تقنية المعلومات والاتصالات', emp: 80, pay: 8000, wait: 7.3, n: 3936 },
      services: { name: 'الخدمات', emp: 79, pay: 5000, wait: 7.4, n: 1119 },
      business: { name: 'الأعمال والإدارة والقانون', emp: 75, pay: 5700, wait: 7.8, n: 23209 },
      social:   { name: 'العلوم الاجتماعية والإعلام', emp: 73, pay: 5100, wait: 8.1, n: 2481 },
      science:  { name: 'العلوم الطبيعية والرياضيات والإحصاء', emp: 64, pay: 5000, wait: 7.7, n: 4660 },
      arts:     { name: 'الفنون والعلوم الإنسانية', emp: 64, pay: 4800, wait: 7.8, n: 9502 },
      edu:      { name: 'التعليم', emp: 63, pay: 5000, wait: 7.3, n: 489 },
      agri:     { name: 'الزراعة والبيطرة', emp: 93, pay: 5200, wait: 6.1, n: 156, small: true }
    },
    fieldsSource: 'المرصد الوطني للعمل، تقرير توظيف الخريجين في سوق العمل السعودي (2025): خريجو البكالوريوس السعوديون الذكور 2023 وتوظيفهم حتى 2024، دون القطاع العسكري.',

    // ميول هولاند ← مجالات الدراسة القريبة (الأول هو الأقرب)
    holland: {
      R: { name: 'الواقعي', fields: ['eng', 'agri', 'services'] },
      I: { name: 'الاستقصائي', fields: ['science', 'health', 'ict'] },
      A: { name: 'الفني', fields: ['arts', 'social'] },
      S: { name: 'الاجتماعي', fields: ['edu', 'health', 'social'] },
      E: { name: 'المغامر', fields: ['business', 'services'] },
      C: { name: 'التقليدي', fields: ['business', 'ict'] }
    },

    // أين يُدرس المجال في المنطقة الشرقية (الأولوية) — أسماء الجهات فقط
    eastern: {
      eng: ['جامعة الملك فهد للبترول والمعادن', 'جامعة الإمام عبدالرحمن بن فيصل', 'جامعة الملك فيصل', 'جامعة حفر الباطن', 'كلية الجبيل الصناعية'],
      health: ['جامعة الإمام عبدالرحمن بن فيصل', 'جامعة الملك فيصل', 'جامعة حفر الباطن'],
      ict: ['جامعة الملك فهد للبترول والمعادن', 'جامعة الإمام عبدالرحمن بن فيصل', 'جامعة الملك فيصل', 'جامعة حفر الباطن', 'كلية الجبيل الصناعية'],
      business: ['جامعة الإمام عبدالرحمن بن فيصل', 'جامعة الملك فيصل', 'جامعة حفر الباطن', 'جامعة الملك فهد للبترول والمعادن'],
      social: ['جامعة الإمام عبدالرحمن بن فيصل', 'جامعة الملك فيصل'],
      science: ['جامعة الملك فهد للبترول والمعادن', 'جامعة الإمام عبدالرحمن بن فيصل', 'جامعة الملك فيصل'],
      arts: ['جامعة الإمام عبدالرحمن بن فيصل', 'جامعة الملك فيصل'],
      edu: ['جامعة الإمام عبدالرحمن بن فيصل', 'جامعة الملك فيصل', 'جامعة حفر الباطن'],
      agri: ['جامعة الملك فيصل'],
      services: ['الكليات التقنية في المنطقة الشرقية', 'كليات الهيئة الملكية بالجبيل']
    },

    // الهيئة العامة للإحصاء — إحصاءات سوق العمل، الربع الثاني 2026، السعوديون الذكور
    qual: {
      wage: [['ثانوي', 9277], ['دبلوم مشارك', 10810], ['دبلوم متوسط', 10456], ['بكالوريوس', 14328], ['ماجستير', 22674], ['دكتوراه', 32094]],
      unemp: [['ثانوي', 6.1], ['دبلوم مشارك', 5.6], ['دبلوم متوسط', 6.3], ['بكالوريوس', 3.2], ['ماجستير', 1.7]],
      source: 'الهيئة العامة للإحصاء، إحصاءات سوق العمل للربع الثاني 2026 (مسح القوى العاملة)، السعوديون الذكور.'
    },

    // المنطقة الشرقية
    region: {
      unempEast: 3.7, unempKSA: 4.8,          // بطالة السعوديين الذكور — الإحصاء، الربع الثاني 2026
      empEast: 66.2, empKSA: 60.8,            // معدل المشتغلين من السكان، السعوديون الذكور
      youthPerUni: 54, youthPerUniKSA: 37,    // ألف شاب سعودي (20–24) لكل جامعة — ورقة د. علي الفوزان، تقديرات تعداد 2022
      iau: { empMale: 78, payMale: 8323, waitMale: 8.3, top: [['الهندسة والتصنيع والبناء', 83], ['التعليم', 79], ['الصحة والرفاه', 74], ['تقنية المعلومات والاتصالات', 72]] }
    },

    // صيغ النسبة الموزونة: g = الثانوية، q = القدرات، t = التحصيلي (أوزان من 100)
    unis: [
      { id: 'iau', name: 'جامعة الإمام عبدالرحمن بن فيصل', city: 'الدمام', east: true,
        f: [{ label: 'جميع الكليات', g: 30, q: 30, t: 40 }],
        status: 'رسمي', note: 'حاسبة بوابة القبول في الجامعة (2026).', url: 'https://admitportal.iau.edu.sa/Web/Calc/' },
      { id: 'kfupm', name: 'جامعة الملك فهد للبترول والمعادن', city: 'الظهران', east: true,
        f: [{ label: 'المسار الإلحاقي', g: 10, q: 50, t: 40 }],
        status: 'رسمي', note: 'المسار الأساسي: 50% قدرات + 50% اختبار تحصيلي خاص بالجامعة، ويُشترط مستوى في اللغة الإنجليزية (STEP أو ما يعادله).', url: 'https://admissions.kfupm.edu.sa/' },
      { id: 'kfu', name: 'جامعة الملك فيصل', city: 'الأحساء', east: true,
        f: [{ label: 'كليات السنة التحضيرية (صحية، هندسة، حاسب، إدارة، علوم، بيطري)', g: 30, q: 30, t: 40 },
            { label: 'بقية الكليات (بنين)', g: 60, q: 40, t: 0 }],
        status: 'آخر نسخة منشورة 1444–1445هـ', note: 'من صفحة شروط القبول في الجامعة؛ تحقّق من دليل العام الحالي.', url: 'https://www.kfu.edu.sa/' },
      { id: 'uhb', name: 'جامعة حفر الباطن', city: 'حفر الباطن', east: true,
        f: [{ label: 'المسارات العلمية (صيغة شائعة)', g: 30, q: 30, t: 40 }],
        status: 'تقديري', note: 'لم نجد صيغة رسمية منشورة للعام الحالي؛ تحقّق من دليل الجامعة.', url: 'https://www.uhb.edu.sa/' },
      { id: 'other', name: 'بقية الجامعات الحكومية', city: 'خارج الشرقية', east: false,
        f: [{ label: 'الصيغة الشائعة للمسارات العلمية', g: 30, q: 30, t: 40 }],
        status: 'تقديري', note: 'كل جامعة تعلن صيغتها في دليل القبول، وقد تختلف بين الكليات.', url: '' }
    ],

    // الحد الأدنى للنسبة الموزونة في جامعة الملك فيصل (بنين) — آخر نسخة منشورة 1444–1445هـ
    kfuMin: [['الطب، الصيدلة، طب الأسنان (لدخول الاختبار التحريري)', 85], ['العلوم الطبية التطبيقية (لدخول الاختبار التحريري)', 80],
             ['الهندسة، الحاسب، إدارة الأعمال، العلوم، الطب البيطري', 75], ['الحقوق', 75], ['الزراعة، التربية، الآداب، الشريعة، الكلية التطبيقية', 65]],

    otherUnis: ['جامعة الملك سعود (الرياض)', 'جامعة الملك عبدالعزيز (جدة)', 'جامعة الإمام محمد بن سعود الإسلامية (الرياض)', 'جامعة الملك سعود بن عبدالعزيز للعلوم الصحية', 'جامعة القصيم', 'جامعة أم القرى (مكة المكرمة)', 'جامعة الملك خالد (أبها)', 'جامعة طيبة (المدينة المنورة)', 'جامعة الأمير سطام بن عبدالعزيز (الخرج)'],

    // مسارات غير الجامعة — في الشرقية أولًا
    paths: [
      { name: 'الكليات التقنية (المؤسسة العامة للتدريب التقني والمهني)', where: 'الدمام والأحساء والجبيل وغيرها', what: 'دبلوم تقني في سنتين تقريبًا، والقبول يُفتح عادة مرتين في السنة.', url: 'https://www.tvtc.gov.sa/' },
      { name: 'كليات الهيئة الملكية بالجبيل (منها كلية الجبيل الصناعية)', where: 'الجبيل الصناعية', what: 'دبلوم وبكالوريوس تقني في الهندسة التطبيقية والحاسب والإدارة، قريبة من مصانع الجبيل.', url: 'https://www.rcjy.gov.sa/' },
      { name: 'برنامج أرامكو للابتعاث الجامعي لخريجي الثانوية', where: 'الظهران', what: 'برنامج تنافسي يجمع الدراسة الجامعية والتوظيف، وشروطه ومواعيده تُعلن كل سنة.', url: 'https://www.aramco.com/' },
      { name: 'الدبلوم ثم التجسير', where: 'جامعات ومعاهد عدة', what: 'يبدأ بالدبلوم ثم يكمل البكالوريوس لاحقًا عبر برامج التجسير.', url: '' }
    ],

    // خطوات عملية حسب الجاهزية
    steps: {
      'جاهزية منخفضة': ['اكتب ثلاثة أشياء تحبها وثلاثة تجيدها، وأحضرها لجلستك مع الموجّه.', 'اقرأ عن مجالين من المجالات أعلاه في منصة تخصصي أو موقع جامعة في الشرقية.', 'احجز جلسة مع الموجّه الطلابي خلال أسبوعين.'],
      'جاهزية متوسطة': ['اختر مجالين من القائمة واقرأ خطتهما الدراسية في موقع جامعة في الشرقية.', 'اعرف مواعيد اختبار القدرات والتحصيلي في موقع هيئة تقويم التعليم والتدريب.', 'اسأل طالبًا جامعيًا يدرس أحد المجالين عن يومه الدراسي.'],
      'جاهزية عالية': ['حدّد تخصصك الأول وبديلين له.', 'اعرف شروط القبول ومواعيده في جامعات الشرقية، واحسب نسبتك الموزونة التقريبية.', 'ضع خطة أسبوعية للاستعداد للقدرات والتحصيلي.']
    }
  };

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  function num(x) { return '<bdi class="bp-n">' + esc(x) + '</bdi>'; }
  function fmt(x) { return Number(x).toLocaleString('en-US'); }
  function keyByName(name) { for (var k in DATA.holland) if (DATA.holland[k].name === name) return k; return null; }

  var CSS = [
    '.bp-logo{position:absolute;left:0;top:50%;transform:translateY(-50%);height:60px;width:auto;max-width:96px;object-fit:contain}',
    'header.bp-has-logo{position:relative;padding-left:104px}',
    '.bp-n{unicode-bidi:isolate;direction:ltr;font-family:system-ui,-apple-system,"Segoe UI",Tahoma,sans-serif}',
    '.bp-card{margin-top:14px}',
    '.bp-new{align-self:flex-start;background:#fff4d6;color:#6b4e00;border-radius:99px;padding:3px 12px;font-size:12px;font-weight:700}',
    '.bp-sub{font-size:12.5px;color:var(--muted,#5c686d);line-height:1.8;margin:0}',
    '.bp-h3{margin:0;font-size:17px;color:var(--ink,#15445a);line-height:1.6}',
    '.bp-h4{margin:4px 0 0;font-size:14px;color:var(--ink,#15445a)}',
    '.bp-fc{border:1.5px solid var(--line,#e0e6e9);border-radius:14px;padding:12px 13px;display:flex;flex-direction:column;gap:9px}',
    '.bp-fc .hd{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap}',
    '.bp-fc .hd b{color:var(--ink,#15445a);font-size:15px}',
    '.bp-why{font-size:11.5px;color:#0b6e6c;background:#e7f5f4;border-radius:99px;padding:2px 10px;font-weight:700}',
    '.bp-st{display:grid;grid-template-columns:repeat(3,1fr);gap:6px}',
    '.bp-st div{background:#f3f8f9;border-radius:10px;padding:8px 4px;text-align:center}',
    '.bp-st strong{display:block;font-size:17px;color:var(--ink,#15445a)}',
    '.bp-st span{font-size:11.5px;color:var(--muted,#5c686d)}',
    '.bp-where{font-size:12.5px;color:#33454c;line-height:1.8}',
    '.bp-where b{color:var(--green,#05623c)}',
    '.bp-lm{display:flex;flex-direction:column;gap:7px}',
    '.bp-lm .r{display:grid;grid-template-columns:92px 1fr 60px;gap:8px;align-items:center;font-size:13px}',
    '.bp-lm .r>span:first-child{font-weight:700}',
    '.bp-lm .v{font-weight:700;color:var(--ink,#15445a);text-align:left}',
    '.bp-lm .t{height:9px;border-radius:99px;background:#e3eaec;overflow:hidden}',
    '.bp-lm .t i{display:block;height:100%;border-radius:99px;background:#0da9a6}',
    '.bp-lm .hl>span:first-child{color:var(--green,#05623c)}',
    '.bp-lm .hl .t i{background:var(--green,#05623c)}',
    '.bp-steps{margin:0;padding:0 20px 0 0;display:flex;flex-direction:column;gap:8px;font-size:14.5px;line-height:1.8}',
    '.bp-src{font-size:11.5px;color:var(--muted,#5c686d);line-height:1.7;margin:0}'
  ].join('\n');

  function injectCss() {
    if (document.getElementById('bp-css')) return;
    var s = document.createElement('style'); s.id = 'bp-css'; s.textContent = CSS; document.head.appendChild(s);
  }

  function bars(rows, max, hiLabel, fmtv) {
    return '<div class="bp-lm">' + rows.map(function (r) {
      return '<div class="r' + (r[0] === hiLabel ? ' hl' : '') + '"><span>' + esc(r[0]) + '</span><div class="t"><i style="width:' + (r[1] / max * 100).toFixed(1) + '%"></i></div><span class="v">' + num(fmtv(r[1])) + '</span></div>';
    }).join('') + '</div>';
  }

  function fieldCard(key, why) {
    var f = DATA.fields[key]; if (!f) return '';
    var where = (DATA.eastern[key] || []).slice(0, 4);
    return '<div class="bp-fc"><div class="hd"><b>' + esc(f.name) + '</b>' + (why ? '<span class="bp-why">' + esc(why) + '</span>' : '') + '</div>' +
      '<div class="bp-st"><div><strong>' + num(f.emp + '%') + '</strong><span>يعملون</span></div><div><strong>' + num(fmt(f.pay)) + '</strong><span>أول راتب (ريال)</span></div><div><strong>' + num(f.wait) + '</strong><span>أشهر انتظار</span></div></div>' +
      (where.length ? '<div class="bp-where"><b>في الشرقية:</b> ' + where.map(esc).join('، ') + '</div>' : '') +
      (f.small ? '<div class="bp-src">عدد خريجي هذا المجال قليل، فخذ الأرقام بحذر.</div>' : '') + '</div>';
  }

  // نتائج الطالب ← رموز الميول وتصنيف الجاهزية
  function readResult(r) {
    var codes = [], band = '';
    (r || []).forEach(function (x) {
      if (x && x.code) codes = String(x.code).split('');
      else if (x && x.tags && x.tags.length) {
        var ks = x.tags.map(keyByName).filter(Boolean);
        if (ks.length) codes = ks;
        else if (/^جاهزية/.test(x.tags[0])) band = x.tags[0];
      }
    });
    return { codes: codes.slice(0, 3), band: band };
  }

  function doneHtml(result) {
    injectCss();
    var rr = readResult(result), used = {}, cards = [];
    rr.codes.forEach(function (k) {
      var h = DATA.holland[k]; if (!h) return;
      for (var i = 0; i < h.fields.length; i++) {
        if (!used[h.fields[i]]) { used[h.fields[i]] = 1; cards.push(fieldCard(h.fields[i], 'ميلك ' + h.name)); break; }
      }
    });
    var out = '';
    if (cards.length) {
      out += '<div class="card bp-card"><span class="bp-new">جديد</span><h3 class="bp-h3">🎓 مجالات قريبة من ميولك… وماذا حدث لخريجيها؟</h3>' +
        '<p class="bp-sub">خريجو البكالوريوس السعوديون الذكور لعام 2023، وتوظيفهم حتى 2024</p>' + cards.join('') +
        '<p style="font-size:13.5px">الأرقام تصف ما حدث لخريجين سابقين، ولا تحدد مستقبلك. اختيار مجال تحبه وتتميّز فيه أهم من رقم واحد.</p>' +
        '<p class="bp-src">المصدر: ' + esc(DATA.fieldsSource) + '</p></div>';
    }
    out += '<div class="card bp-card"><h3 class="bp-h3">📊 قيمة المؤهل في سوق العمل</h3><p class="bp-sub">للسعوديين الذكور في المملكة، الربع الثاني 2026</p>' +
      '<h4 class="bp-h4">متوسط الأجر الشهري حسب المؤهل (ريال)</h4>' + bars(DATA.qual.wage, 32094, 'بكالوريوس', fmt) +
      '<h4 class="bp-h4">نسبة البطالة حسب المؤهل</h4>' + bars(DATA.qual.unemp, 8, 'بكالوريوس', function (x) { return x + '%'; }) +
      '<p style="font-size:13.5px">الدبلوم والبكالوريوس يرفعان الأجر غالبًا ويخفضان البطالة. وإن لم تكن الجامعة خيارك الآن، فالدبلوم التقني في الشرقية طريق جيد أيضًا.</p>' +
      '<p class="bp-src">المصدر: ' + esc(DATA.qual.source) + '</p></div>';
    var st = DATA.steps[rr.band] || DATA.steps['جاهزية متوسطة'];
    out += '<div class="card bp-card"><h3 class="bp-h3">✅ خطواتك القادمة</h3><ol class="bp-steps">' + st.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
      '<p class="bp-sub">سيطلب منك الموجّه إعادة استبانة نضج القرار في الفصل القادم لترى تقدّمك.</p></div>';
    out += '<p class="bp-src" style="text-align:center;margin-top:10px">آخر تحديث للأرقام: ' + esc(DATA.updatedLabel) + '</p>';
    return out;
  }

  function header(schoolName) {
    try {
      injectCss();
      if (!/الإمام محمد بن سعود/.test(schoolName || '')) return;
      var h = document.querySelector('header'); if (!h || h.querySelector('.bp-logo')) return;
      var im = document.createElement('img'); im.className = 'bp-logo'; im.alt = 'شعار ' + schoolName; im.src = 'imam-logo.png';
      im.onerror = function () { im.remove(); h.classList.remove('bp-has-logo'); };
      h.classList.add('bp-has-logo'); h.appendChild(im);
    } catch (e) {}
  }

  window.BawsalaPlus = { DATA: DATA, esc: esc, num: num, fmt: fmt, bars: bars, fieldCard: fieldCard, injectCss: injectCss, doneHtml: doneHtml, header: header, readResult: readResult };
})();
