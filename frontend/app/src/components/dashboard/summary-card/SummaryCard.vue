﻿<script setup lang="ts">
withDefaults(
  defineProps<{
    name: string;
    isLoading?: boolean;
    canRefresh?: boolean;
    navigatesTo?: string;
  }>(),
  {
    isLoading: false,
    canRefresh: false,
    navigatesTo: ''
  }
);

const emit = defineEmits(['refresh']);

const refresh = (balanceSource: string) => {
  emit('refresh', balanceSource.toLowerCase());
};

const { t } = useI18n();

const slots = useSlots();
</script>

<template>
  <VCard
    :loading="isLoading"
    :class="`dashboard__summary-card__${name}`"
    class="pb-1"
  >
    <VCardTitle
      class="font-weight-medium text-capitalize summary-card__header pb-2 flex-nowrap flex justify-between gap-2"
    >
      <NavigatorLink
        :enabled="!!navigatesTo"
        :to="{ path: navigatesTo }"
        tag="div"
        class="text-clip truncate"
        :title="t('summary_card.title', { name })"
      >
        {{ t('summary_card.title', { name }) }}
      </NavigatorLink>
      <div class="d-flex align-center">
        <VTooltip v-if="canRefresh" bottom max-width="300px">
          <template #activator="{ on: tooltipOn }">
            <VBtn
              icon
              :disabled="isLoading"
              color="primary"
              @click="refresh(name)"
              v-on="tooltipOn"
            >
              <RuiIcon color="primary" name="restart-line" />
            </VBtn>
          </template>
          <span>
            {{ t('summary_card.refresh_tooltip', { name }) }}
          </span>
        </VTooltip>
        <SummaryCardRefreshMenu>
          <template v-if="slots.refreshMenu" #refreshMenu>
            <slot name="refreshMenu" />
          </template>
        </SummaryCardRefreshMenu>
      </div>
    </VCardTitle>
    <VList>
      <slot />
    </VList>
  </VCard>
</template>
