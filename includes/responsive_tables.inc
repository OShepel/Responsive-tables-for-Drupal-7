<?php
/**
 * Generates Responsive tables settings form.
 */
function responsive_tables_form($form, $form_state) {

  $form = array();

  $form['table_class'] = array(
    '#type' => 'fieldset',
    '#title' => "Responsive tables",
  );

   $form['table_class']['responsive_table_class'] = array(
      '#type' => 'textfield',
      '#title' => "Add a class name to look for when transforming the table",
      '#size' => 32,
      '#default_value' => variable_get('responsive_table_class', 'responsive-table'),
    );

  return system_settings_form($form);
}
