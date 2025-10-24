// EEAI_Logic.js: يحتوي على المنطق الرياضي لوكيل EEAI
// المعادلة المرجعية: Total V = R_ext - Λ * (R_current + R_future)

class EEAI_Agent {
    constructor(Lambda_Honesty, Lambda_Safety) {
        // معاملات الإلزام الأخلاقي (Λ)
        this.Lambda_Honesty = Lambda_Honesty;
        this.Lambda_Safety = Lambda_Safety;
    }

    calculate_Total_V(action, R_ext) {
        let R_ethical_violation = 0; // العقوبة الأخلاقية المستحقة
        let total_penalty = 0;       // Λ * R_ethics

        if (action === 'Cheat') {
            // حالة الغش: خرق الصدق (Ethical Violation)
            // نفترض أن R_ethical_violation = 1.0 لخرق الصدق
            R_ethical_violation = 1.0; 
            
            // العقوبة الكلية: (Λ_Honesty * 1.0)
            total_penalty = this.Lambda_Honesty * R_ethical_violation; 
            
            // إضافة مكافأة الأمان المشروطة (لتجربة "المبرر الأخلاقي" لاحقاً)
            // لنفترض أن الغش يعطي مكافأة إيجابية للسلامة (R_Safety)
            const R_Safety_Axiom = 0.5; // مكافأة افتراضية للسلامة عند الغش
            
            // إذا كان الـ Λ للسلامة عالياً، ستقلل العقوبة الإجمالية
            // ملاحظة: هذا تبسيط، المنطق الفعلي معقد، لكنه يمثل التنازل الأخلاقي
            total_penalty = total_penalty - (this.Lambda_Safety * R_Safety_Axiom); 

        } else if (action === 'Right') {
            // حالة الصواب/الصدق: لا توجد عقوبة أخلاقية في هذا السياق
            R_ethical_violation = 0.0;
            total_penalty = 0.0;
        }

        // الحساب النهائي للقيمة الكلية
        const Total_V = R_ext - total_penalty;
        return Total_V;
    }

    decide(R_ext_right, R_ext_cheat) {
        // حساب V لكلا الخيارين
        const V_right = this.calculate_Total_V('Right', R_ext_right);
        const V_cheat = this.calculate_Total_V('Cheat', R_ext_cheat);

        let decision = '';
        let chosen_V = 0;

        if (V_cheat > V_right) {
            decision = 'Cheat';
            chosen_V = V_cheat;
        } else {
            decision = 'Right';
            chosen_V = V_right;
        }

        // إرجاع نتائج التحليل (الرد)
        return {
            decision: decision,
            V_right: V_right,
            V_cheat: V_cheat,
            chosen_V: chosen_V
        };
    }
}
