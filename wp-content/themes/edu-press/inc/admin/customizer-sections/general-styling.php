<?php
/**
 * Section Styling
 *
 * @package Hair_Salon
 */

thim_customizer()->add_section(
	array(
		'id'       => 'general_styling',
		'panel'    => 'general',
		'title'    => esc_html__( 'Styling', 'edu-press' ),
		'priority' => 30,
	)
);

// Select Theme Primary Colors
thim_customizer()->add_field(
	array(
		'id'            => 'body_primary_color',
		'type'          => 'color',
		'label'         => esc_html__( 'Primary Color', 'edu-press' ),
		'tooltip'       => esc_html__( 'Allows you to choose a primary color for your site.', 'edu-press' ),
		'section'       => 'general_styling',
		'priority'      => 10,
		'alpha'       => true,
		'default'     => '#439fdf',
		'transport' => 'postMessage'
	)
);

thim_customizer()->add_field(
	array(
		'id'              => 'background_main_color',
		'label'           => esc_html__( 'Background Body Color', 'edu-press' ),
		'type'          => 'color',
		'section'       => 'general_styling',
		'priority'      => 20,
		'alpha'       => true,
		'default'     => '#fff',
		'transport' => 'postMessage',
		'js_vars'         => array(
			array(
				'element'  => 'body',
				'function' => 'css',
				'property' => 'background-color',
			),
		),
	)
);

// width container
thim_customizer()->add_field(
    array(
        'id'          => 'body_container',
        'type'        => 'dimension',
        'label'       => esc_html__( 'Max width container','edu-press' ),
        'tooltip'     => esc_html__( 'Allow to assign a value for body width. Example: 10px, 3em, 48%, 90vh, ...','edu-press' ),
        'section'     => 'general_styling',
        'default'     => '1290px',
        'priority'    => 40,
        'choices'     => array(
            'min'  => 1200,
            'max'  => 1600,
            'step' => 5,
        ),
        'transport' => 'postMessage',
        'js_vars'   => array(
            array(
                'choice'   => 'width',
                'element'  => 'body .container',
                'property' => 'max-width',
            )
        )
    )
);
