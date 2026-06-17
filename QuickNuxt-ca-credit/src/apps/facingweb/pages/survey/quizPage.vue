<template>
  <MuiPage>
    <BizShareManaForm :schema="validationRules" :state="dataForm" @submit="onSubmit">
      <BizShareText :text="quiz.quizTitle" :is-bold="true" class="text-2xl" />
      <MuiCard v-for="(q, qIndex) in quiz.questions" :key="qIndex" class="p-4">
        <div class="space-y-3">
          <BizShareText :text="`ข้อที่ ${qIndex + 1}: ${q.question}`" :is-bold="true" />
          <UFormGroup :name="`answer${qIndex}`">
            <URadio v-for="(option, idx) in q.options" :key="idx" :modelValue="dataForm[getAnswerKey(qIndex)]"
              :value="option" :label="option" :disabled="showResult"
              @update:modelValue="val => dataForm[getAnswerKey(qIndex)] = val" class="mt-4" />
          </UFormGroup>
          <BizSurveyQuizResult :show="showResult" :correct="isCorrect(qIndex)"
            :correctAnswer="q.options[q.correctAnswerIndex]" :explanation="q.explanation" />
        </div>
      </MuiCard>
      <div v-if="showResult" class="text-center mt-6">
        <BizShareText class="text-green-700 text-xl" :is-bold="true"
          :text="`🎯 คุณตอบถูก ${score} / ${quiz.questions.length} ข้อ`" />
      </div>
      <ActionButton text="ยืนยัน" />
    </BizShareManaForm>
  </MuiPage>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from "vue";
import type { FormSubmitEvent } from "#ui/types";
import { ActionButton, getManaContext } from "@manaapp/ui";
import { z } from "zod";

const manaLib = await getManaContext();
const store = useSurveyStore();
const { postData } = store;

const { getRandomQuestions } = useQuestions();
const quizQuestions = ref(getRandomQuestions(3));

const quiz = {
  quizTitle: "แบบประเมินการตระหนักรู้ต่อภัยทุจริต",
  questions: quizQuestions.value,
};

function getAnswerKey(index: number): keyof Schema {
  return `answer${index}` as keyof Schema
}

const validationRules = z.object({
  answer0: z.string().min(1, "กรุณาเลือกคำตอบ"),
  answer1: z.string().min(1, "กรุณาเลือกคำตอบ"),
  answer2: z.string().min(1, "กรุณาเลือกคำตอบ"),
});

type Schema = z.output<typeof validationRules>;

const dataForm = reactive<Schema>({
  answer0: "",
  answer1: "",
  answer2: "",
});

const showResult = ref(false);
const showWarning = ref(false);
const submittedOnce = ref(false);

const canSubmit = computed(() =>
  Object.values(dataForm).every((ans) => ans && ans.length > 0)
);

const isCorrect = (qIndex: number) => {
  const answer = dataForm[`answer${qIndex}` as keyof Schema];
  const correct = quiz.questions[qIndex].options[quiz.questions[qIndex].correctAnswerIndex];
  return answer === correct;
};

const score = computed(() =>
  quiz.questions.reduce((acc, q, i) => {
    const answer = dataForm[`answer${i}` as keyof Schema];
    const correct = q.options[q.correctAnswerIndex];
    return acc + (answer === correct ? 1 : 0);
  }, 0)
);

const onSubmit = async (event: FormSubmitEvent<Schema>) => {
  if (!canSubmit.value) {
    showWarning.value = true;
    return;
  }
  showWarning.value = false;
  showResult.value = true;

  if (score.value === quiz.questions.length) {
    if (event.data) {
      await postData(event.data, "post-survey-quizpage");
    }
    return;
  }

  if (submittedOnce.value) {
    await postData(event.data, "post-survey-quizpage");
    return;
  }

  submittedOnce.value = true;
};
</script>
