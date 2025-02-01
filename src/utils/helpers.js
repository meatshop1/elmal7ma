export const convertEnglishToArabic = (englishNumber) => {
    const arabicNumbers = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩'];
    return englishNumber.toString().replace(/\d/g, (d) => arabicNumbers[d]);
    }
